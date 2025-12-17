import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import { z } from 'zod';

// Define Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "L'adresse email est invalide" }),
  telephone: z.string().min(9, { message: "Le numéro de téléphone est invalide" }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caractères" }),
  honeypot: z.string().optional() // Should be empty or undefined
});

// Helper function to get credentials
const getCredentials = () => {
  // Production: Use environment variable
  if (process.env.NODE_ENV === 'production' && process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  }

  // Development: Use local file
  if (process.env.NODE_ENV !== 'production') {
    const filePath = path.join(process.cwd(), 'google-credentials.json');
    if (fs.existsSync(filePath)) {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(fileContents);
    }
  }

  return null;
};

export async function POST(request) {
  try {
    const body = await request.json();

    // 1. Zod Validation
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      // Return first error message
      const errorMessage = validationResult.error.errors[0]?.message || "Données invalides";
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }

    const { name, email, telephone, message, honeypot } = validationResult.data;

    // 2. Anti-spam: Honeypot check
    // If honeypot is present and not empty, it's a bot.
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // 3. Save to Firebase (Primary Storage)
    try {
      const { addDoc, collection } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase/firebaseApp');
      
      await addDoc(collection(db, 'messages'), {
        name,
        email,
        phone: telephone,
        message,
        isRead: false,
        createdAt: new Date().toISOString(),
        source: 'contact_form'
      });
    } catch (firebaseError) {
      console.error('Erreur Firebase Insert:', firebaseError);
      // We don't block execution here, allowing Google Sheets attempt
    }

    // 4. Google Sheets Integration (Legacy / Backup)
    try {
      const credentials = getCredentials();

      if (!credentials) {
        console.warn('Google Credentials not found, skipping Sheets');
      } else {
        const auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID;

        if (spreadsheetId) {
          const date = new Date().toLocaleString('fr-FR', {
            timeZone: 'Asia/Jerusalem',
          });

          await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'A1',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
              values: [[date, name, email, telephone, message]],
            },
          });
        }
      }
    } catch (sheetError) {
      console.error('Erreur Google Sheets:', sheetError);
      // Fail silently for user if Firebase worked or if it's just a backup failure
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message envoyé avec succès !',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}

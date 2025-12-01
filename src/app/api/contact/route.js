import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

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
    const { name, email, telephone, message, honeypot } = await request.json();

    // Anti-spam: Honeypot field
    if (honeypot) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // Validation
    if (!name || !email || !telephone || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Google Sheets Integration
    try {
      const credentials = getCredentials();

      if (!credentials) {
        throw new Error('Les identifiants Google n\'ont pas pu être chargés.');
      }

      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      const sheets = google.sheets({ version: 'v4', auth });

      const spreadsheetId = process.env.GOOGLE_SHEET_ID;
      console.log('📄 ID du Sheet:', spreadsheetId);

      if (!spreadsheetId) {
        throw new Error('GOOGLE_SHEET_ID manquant dans .env.local');
      }

      // Date formatée
      const date = new Date().toLocaleString('fr-FR', {
        timeZone: 'Asia/Jerusalem',
      });

      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'A1', // Commence à écrire à partir de la première feuille
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[date, name, email, telephone, message]], // Les colonnes: Date, Nom, Email, Téléphone, Message
        },
      });

      return NextResponse.json(
        {
          success: true,
          message: 'Message envoyé avec succès !',
        },
        { status: 200 }
      );
    } catch (sheetError) {
      console.error('Erreur Google Sheets:', sheetError);
      // DEBUG: Retourner l'erreur exacte pour comprendre le problème Vercel
      return NextResponse.json(
        {
          success: false,
          error: 'Erreur Google Sheets: ' + sheetError.message,
          details: JSON.stringify(sheetError)
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Erreur API contact:', error);
    return NextResponse.json(
      { error: 'Erreur serveur. Veuillez réessayer.' },
      { status: 500 }
    );
  }
}


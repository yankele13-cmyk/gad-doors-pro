import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import { supabase } from '@/lib/supabase';

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

    // 1. Sauvegarde dans Supabase (Nouveau Système Admin)
    try {
      const { error: supabaseError } = await supabase
        .from('messages')
        .insert([
          {
            name,
            email,
            phone: telephone,
            message,
            is_read: false
          }
        ]);
      
      if (supabaseError) {
        console.error('Erreur Supabase Insert:', supabaseError);
        // On ne bloque pas si Supabase échoue, on continue vers Google Sheets pour backup
      } else {
        console.log('✅ Message sauvegardé dans Supabase');
      }
    } catch (err) {
      console.error('Erreur inattendue Supabase:', err);
    }

    // 2. Google Sheets Integration (Legacy / Backup)
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
      // On continue même si Sheets échoue, tant que la réponse utilisateur est OK
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


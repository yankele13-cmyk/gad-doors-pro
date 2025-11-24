import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request) {
  try {
    const { name, email, message, honeypot } = await request.json();

    // Anti-spam: Honeypot field
    if (honeypot) {
      return NextResponse.json({ error: 'Spam detected' }, { status: 400 });
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Google Sheets Integration
    try {
      // Utiliser les credentials depuis les variables d'environnement (Vercel compatible)
      const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
        ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)
        : null;

      if (!credentials) {
        throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY manquant dans les variables d\'environnement');
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
          values: [[date, name, email, message]], // Les colonnes: Date, Nom, Email, Message
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


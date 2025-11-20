import { NextResponse } from 'next/server';
import { siteConfig } from '@/config/siteConfig';

export async function POST(request) {
  try {
    const { name, email, message, honeypot } = await request.json();

    // Anti-spam: Honeypot field (invisible to users)
    if (honeypot) {
      return NextResponse.json(
        { error: 'Spam detected' },
        { status: 400 }
      );
    }

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis' },
        { status: 400 }
      );
    }

    // Email validation simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Pour l'instant, on simule l'envoi
    // TODO: Intégrer avec Resend ou EmailJS quand prêt
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Nouveau message de contact:', {
        from: `${name} <${email}>`,
        message: message,
        timestamp: new Date().toISOString()
      });
    }

    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    // En production, vous utiliseriez un service comme Resend:
    /*
    const { Resend } = require('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'contact@gaddoors.com',
      to: siteConfig.contact.email,
      subject: `Nouveau message de ${name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    */

    return NextResponse.json(
      { 
        success: true, 
        message: 'Message envoyé avec succès ! Nous vous répondrons rapidement.' 
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

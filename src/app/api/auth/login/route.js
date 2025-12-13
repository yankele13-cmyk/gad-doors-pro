
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// The secure hash we just generated for 'admin123'
const HASHED_PASSWORD = '$2b$10$/VuNq7KWKafZGLN3hkurAuBkpljA2fVy9m2fyUGuILOOLt.HEKoMC';
const ADMIN_EMAIL = 'admin@gaddoors.com';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        if (email !== ADMIN_EMAIL) {
            return NextResponse.json({ success: false, error: 'Email ou mot de passe incorrect' }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, HASHED_PASSWORD);

        if (isMatch) {
            // In a real app, you would set an HTTP-only cookie here.
            // For this MVP, we return success so the client can set a session flag.
            return NextResponse.json({ success: true, token: 'secure_session_token_' + Date.now() });
        } else {
            return NextResponse.json({ success: false, error: 'Email ou mot de passe incorrect' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Erreur serveur' }, { status: 500 });
    }
}

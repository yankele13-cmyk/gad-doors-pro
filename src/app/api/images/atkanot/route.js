// src/app/api/images/atkanot/route.js
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), 'public', 'images', 'atkanot');
    const files = fs.readdirSync(dirPath);
    
    // Filtrer pour ne garder que les images
    const images = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("API Error fetching atkanot images:", error);
    return NextResponse.json({ error: 'Failed to load images' }, { status: 500 });
  }
}

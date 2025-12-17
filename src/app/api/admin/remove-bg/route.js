import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request) {
  try {
    // 1. Vérification de sécurité (Admin check could go here if using NextAuth session)
    
    // 2. Vérification des clés API
    if (!process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: "Configuration Cloudinary manquante. Vérifiez .env.local" },
        { status: 500 }
      );
    }

    // 3. Récupération du fichier
    const formData = await request.formData();
    const file = formData.get('file');
    const prompt = formData.get('prompt'); // Récupération du prompt

    if (!file) {
      return NextResponse.json(
        { error: "Aucun fichier fourni" },
        { status: 400 }
      );
    }

    // Convertir le fichier en buffer pour l'upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. Upload vers Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadParams = {
        folder: 'gad-doors-products',
        resource_type: "image",
      };
      
      // Si PAS de prompt, on demande le background_removal classique dès l'upload pour les métadonnées
      if (!prompt) {
          uploadParams.background_removal = "cloudinary_ai";
      }

      const uploadStream = cloudinary.uploader.upload_stream(
        uploadParams,
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    
    // Construct URL with on-the-fly transformation
    let final_url = result.secure_url;
    
    if (result.public_id) {
       const baseUrl = result.secure_url.split('/upload/')[0];
       const versionPart = result.version ? `/v${result.version}` : '';
       
       if (prompt) {
           // 🎨 CAS 1 : Génération de fond avec Prompt
           // Syntax: e_gen_background_replace:prompt_<promp encoded>
           const encodedPrompt = encodeURIComponent(prompt);
           final_url = `${baseUrl}/upload/e_gen_background_replace:prompt_${encodedPrompt}${versionPart}/${result.public_id}`;
       } else {
           // ✂️ CAS 2 : Détourage simple (Transparent)
           final_url = `${baseUrl}/upload/e_background_removal,f_png${versionPart}/${result.public_id}`;
       }
    }

    return NextResponse.json({ 
      success: true, 
      url: final_url, 
      original_url: result.secure_url,
      public_id: result.public_id,
      info: result.info 
    });

  } catch (error) {
    console.error("🚨 Cloudinary Upload Error:", error);
    return NextResponse.json(
      { error: error.message || "Erreur lors du traitement de l'image" },
      { status: 500 }
    );
  }
}

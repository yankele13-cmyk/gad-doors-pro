const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually read .env.local
let env = {};
try {
  const envContent = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      env[key.trim()] = value.trim();
    }
  });
} catch (e) {
  console.log('Could not read .env.local');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || 'https://kwlyhnmbbgnlczmxqwbq.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3bHlobm1iYmdubGN6bXhxd2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MDQ0NjEsImV4cCI6MjA4MTI4MDQ2MX0.crtLDJKbZpYSel-ONh5iJhoVqBoVEEaKXf9gBlSExRk';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadDirectory(dirPath, bucketPrefix = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    // Calculate bucket path (relative to valid image roots)
    // We want 'studioDoors/foo.jpg' -> 'studioDoors/foo.jpg'
    // But 'public/images/studioDoors/foo.jpg' -> 'studioDoors/foo.jpg'
    // So if bucketPrefix is empty, we use entry.name, else prefix + entry.name
    let nextBucketPrefix = bucketPrefix ? `${bucketPrefix}/${entry.name}` : entry.name;
    
    // Fix: If we are scanning root 'public/images', we want the files there to be at root of bucket?
    // Or do we want 'images/foo.jpg'?
    // User requested "fais de meme piur toutes les imges"
    // Usually images at 'public/images/foo.jpg' are accessed as '/images/foo.jpg' locally.
    // Use the relative path from 'public/images' as the storage path.
    
    if (entry.isDirectory()) {
      await uploadDirectory(fullPath, nextBucketPrefix);
    } else {
      if (!entry.name.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) continue;

      // Ensure we use forward slashes for bucket paths
      const bucketPath = nextBucketPrefix.replace(/\\/g, '/');
      const startPath = 'public/images';
      // Recalculate relative path cleanly
      const relativePath = path.relative(path.join(__dirname, '../public/images'), fullPath).replace(/\\/g, '/');

      try {
        const fileBuffer = fs.readFileSync(fullPath);
        console.log(`Uploading ${relativePath}...`);
        
        const { error } = await supabase.storage
          .from('product-images')
          .upload(relativePath, fileBuffer, {
            contentType: getMimeType(entry.name),
            upsert: true
          });

        if (error) {
          console.error(`❌ Error uploading ${relativePath}:`, error.message);
        } else {
          console.log(`✅ Uploaded ${relativePath}`);
        }
      } catch (err) {
        console.error(`Error reading ${fullPath}:`, err);
      }
    }
  }
}

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case '.jpg': return 'image/jpeg';
    case '.jpeg': return 'image/jpeg';
    case '.png': return 'image/png';
    case '.gif': return 'image/gif';
    case '.svg': return 'image/svg+xml';
    case '.webp': return 'image/webp';
    default: return 'application/octet-stream';
  }
}

async function main() {
  const imagesRoot = path.join(__dirname, '../public/images');
  if (fs.existsSync(imagesRoot)) {
    console.log(`Starting bulk upload from ${imagesRoot}...`);
    // Pass empty string as prefix so recursive function calculates relative path correctly internally?
    // Actually my recursive logic above was slightly mixed.
    // Let's just use a simpler approach: walk directory, calculate relative path for each file.
    
    await walkAndUpload(imagesRoot);
  } else {
    console.error('public/images directory not found');
  }
}

async function walkAndUpload(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      await walkAndUpload(fullPath);
    } else {
       if (!file.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) continue;
       
       const relativePath = path.relative(path.join(__dirname, '../public/images'), fullPath).replace(/\\/g, '/');
       const fileBuffer = fs.readFileSync(fullPath);
       
       console.log(`Uploading ${relativePath}...`);
        const { error } = await supabase.storage
          .from('product-images')
          .upload(relativePath, fileBuffer, {
            contentType: getMimeType(file),
            upsert: true
          });
          
        if (error) console.error(`❌ Failed ${relativePath}: ${error.message}`);
        else console.log(`✅ Success ${relativePath}`);
    }
  }
}

main();

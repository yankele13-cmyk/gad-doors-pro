const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually read .env.local to avoid dotenv dependency
try {
  const envContent = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  });
} catch (e) {
  console.log('Could not read .env.local, checking process.env...');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://kwlyhnmbbgnlczmxqwbq.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3bHlobm1iYmdubGN6bXhxd2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3MDQ0NjEsImV4cCI6MjA4MTI4MDQ2MX0.crtLDJKbZpYSel-ONh5iJhoVqBoVEEaKXf9gBlSExRk';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadFile(localPath, bucketPath, mimeType) {
  try {
    const filePath = path.join(__dirname, '..', localPath);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      return;
    }
    const fileBuffer = fs.readFileSync(filePath);
    
    console.log(`Uploading ${localPath} to ${bucketPath}...`);
    
    const { data, error } = await supabase.storage
      .from('product-images')
      .upload(bucketPath, fileBuffer, {
        contentType: mimeType,
        upsert: true
      });

    if (error) {
      console.error('Error uploading:', error.message);
    } else {
      console.log('✅ Upload success:', data.path);
    }
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

async function main() {
  await uploadFile('public/images/door-white-multi-window.jpg', 'door-sample.jpg', 'image/jpeg');
  await uploadFile('public/images/studioAccessories/accessory-handle-style-1.jpg', 'handle-sample.jpg', 'image/jpeg');
}

main();

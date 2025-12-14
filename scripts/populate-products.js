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

// ------------------------------------------------------------------
// PROFESSIONAL METADATA MAPPING
// ------------------------------------------------------------------
const metadataMap = {
  // --- DOORS ---
  'door-concrete-window': {
    name: 'Porte Design Béton - Vitrage Intégré',
    name_he: 'דלת בטון מעוצבת - עם צוהר',
    description: 'Une porte au look industriel moderne avec finition effet béton et insert vitré vertical pour laisser passer la lumière.',
    description_he: 'דלת במראה תעשייתי מודרני בגימור בטון ושילוב זכוכית אנכית להכנסת אור.',
  },
  'door-epoxy-style-5': {
    name: 'Porte Epoxy Premium - Style 5',
    name_he: 'דלת אפוקסי פרימיום - דגם 5',
    description: 'Finition Epoxy haute résistance, surface ultra-lisse et design épuré pour les intérieurs contemporains.',
    description_he: 'גימור אפוקסי עמיד במיוחד, משטח חלק ועיצוב נקי לחללי פנים עכשוויים.',
  },
  'door-wenge-wave': {
    name: 'Porte Wengé - Motif Vague',
    name_he: 'דלת וונגה - דגם גל',
    description: 'L\'élégance du bois Wengé sombre associée à un motif de vague gravé pour une touche artistique unique.',
    description_he: 'האלגנטיות של עץ וונגה כהה משולבת עם עיצוב גלי חרוט למגע אומנותי ייחודי.',
  },
  'door-white-2-panels': {
    name: 'Porte Blanche Classique - 2 Panneaux',
    name_he: 'דלת לבנה קלאסית - 2 פאנלים',
    description: 'Le charme intemporel. Une porte blanche immaculée avec deux panneaux moulurés pour un style traditionnel raffiné.',
    description_he: 'הקסם הנצחי. דלת לבנה צחורה עם שני פאנלים מעוצבים לסגנון מסורתי מעודן.',
  },
  'door-luxury-style-1': {
    name: 'Porte Luxury - Collection Or',
    name_he: 'דלת יוקרה - קולקציית זהב',
    description: 'Une porte d\'exception pour des entrées majestueuses, alliant matériaux nobles et finitions dorées.',
    description_he: 'דלת יוצאת דופן לכניסות מלכותיות, המשלבת חומרים אצילים וגימורים מוזהבים.',
  },
  // Defaults generator based on extensive keywords if not in map
};

function generateMetadata(filename, category) {
  const baseName = path.parse(filename).name;
  
  // 1. Check direct map
  if (metadataMap[baseName]) {
    return { ...metadataMap[baseName], category };
  }

  // 2. Intelligent Generation
  let name = baseName.replace(/[-_]/g, ' ');
  let nameHe = baseName.replace(/[-_]/g, ' ');
  let description = '';
  let descriptionHe = '';

  // Keywords analysis
  const isWhite = name.includes('white');
  const isWenge = name.includes('wenge');
  const isWalnut = name.includes('walnut');
  const isGlass = name.includes('window') || name.includes('glass');
  
  // Name construction
  name = name.replace(/\b\w/g, l => l.toUpperCase()); // Capitalize
  
  if (category === 'doors') {
    if (isWhite) {
      name = name.replace('White', 'Blanche');
      nameHe = 'דלת לבנה ' + nameHe.replace('white', '');
      description = 'Une porte blanche lumineuse qui s\'adapte à tous les décors.';
      descriptionHe = 'דלת לבנה ומוארת המתאימה לכל סגנון עיצוב.';
    } else if (isWenge) {
      name = name.replace('Wenge', 'Wengé');
      nameHe = 'דלת וונגה ' + nameHe.replace('wenge', '');
      description = 'Bois sombre riche et profond pour une ambiance chaleureuse.';
      descriptionHe = 'עץ כהה עשיר ועמוק לאווירה חמימה.';
    } else if (isWalnut) {
      name = name.replace('Walnut', 'Noyer');
      nameHe = 'דלת אגוז ' + nameHe.replace('walnut', '');
      description = 'L\'authenticité du bois de noyer pour un intérieur naturel.';
      descriptionHe = 'האותנטיות של עץ אגוז למראה טבעי.';
    } else {
      description = 'Une porte de qualité supérieure fabriquée avec précision.';
      descriptionHe = 'דלת איכותית המיוצרת בדייקנות.';
    }

    if (isGlass) {
      name += ' (Vitrée)';
      nameHe += ' (עם זכוכית)';
      description += ' Inclut des éléments vitrés élégants.';
      descriptionHe += ' כוללת אלמנטים מזכוכית מעוצבת.';
    }
  } else {
    // Accessories
    name = name.replace('Accessory', 'Accessoire').replace('Handle', 'Poignée').replace('Hardware', 'Quincaillerie');
    nameHe = 'אביזר ' + nameHe.replace('accessory', '');
    if (name.includes('Poignée')) {
        description = 'Poignée ergonomique et design pour sublimer vos portes.';
        descriptionHe = 'ידית ארגונומית ומעוצבת לשדרוג הדלתות.';
    } else {
        description = 'Accessoire de montage professionnel haute durabilité.';
        descriptionHe = 'אביזר הרכבה מקצועי בעמידות גבוהה.';
    }
  }

  return {
    name: name,
    name_he: nameHe, // Simplified Hebrew generation (would need proper translation API for better results)
    description: description,
    description_he: descriptionHe,
    category
  };
}

async function clearTable() {
  console.log('🧹 Clearing existing products...');
  // We can't delete everything blindly if there are foreign keys, but here it's simple.
  // DELETE * FROM products
  const { error } = await supabase.from('products').delete().neq('id', 0); // Hacky delete all
  if (error) console.error('Error clearing table:', error.message);
  else console.log('✅ Table cleared.');
}

async function insertProductsFromDir(dirName, category) {
  const dirPath = path.join(__dirname, '../public/images', dirName);
  
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory ${dirName} not found, skipping.`);
    return;
  }

  const files = fs.readdirSync(dirPath);
  console.log(`Processing ${category} from ${dirName}...`);

  for (const file of files) {
    if (!file.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) continue;

    const dbImagePath = `${dirName}/${file}`;
    const metadata = generateMetadata(file, category);

    // console.log(`Adding ${metadata.name}...`);

    const { error } = await supabase
      .from('products')
      .insert([
        {
          name: metadata.name,
          name_he: metadata.name_he,
          category: metadata.category,
          image: dbImagePath,
          description: metadata.description,
          description_he: metadata.description_he,
          is_hidden: false
        }
      ]);

    if (error) {
      console.error(`❌ Failed to add ${metadata.name}:`, error.message);
    } else {
      process.stdout.write('.'); // Compact progress
    }
  }
  console.log('\n');
}

async function main() {
  await clearTable();
  await insertProductsFromDir('studioDoors', 'doors');
  await insertProductsFromDir('studioAccessories', 'accessories');
  console.log('🎉 Reconstruction Complete!');
}

main();

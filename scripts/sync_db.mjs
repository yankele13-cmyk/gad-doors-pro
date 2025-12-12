import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://whstcylkadklvjzfwdmz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_jdiWtjeNc5HM9tgs6_VaRQ_Dt6fdFCo';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const products = [
  // Portes
  { id: 1, name: 'Porte Béton Fenêtre', name_he: 'דלת בטון עם צוהר', category: 'doors', image: 'studioDoors/door-concrete-window.jpg', description: 'Design industriel audacieux avec finition effet béton gris et insert vitré vertical pour un apport de lumière subtil.', description_he: 'עיצוב תעשייתי נועז בגימור בטון אפור עם צוהר זכוכית אנכי לכניסת אור מעודנת.' },
  { id: 2, name: 'Porte Epoxy Linea', name_he: 'דלת אפוקסי לינאה', category: 'doors', image: 'studioDoors/door-epoxy-style-5.jpg', description: 'Élégance pure. Finition Epoxy lisse ultra-résistante avec gravures horizontales modernes.', description_he: 'אלגנטיות טהורה. גימור אפוקסי חלק ועמיד במיוחד עם חריטות אופקיות מודרניות.' },
  { id: 3, name: 'Porte Formica Dura', name_he: 'דלת פורמייקה דורה', category: 'doors', image: 'studioDoors/door-formica-style-4.jpg', description: 'Le mariage parfait de la durabilité et du style. Revêtement Formica haute densité anti-rayures.', description_he: 'השילוב המושלם בין עמידות וסטייל. חיפוי פורמייקה בצפיפות גבוהה נגד שריטות.' },
  { id: 4, name: 'Porte Luxe Royal', name_he: 'דלת יוקרה רויאל', category: 'doors', image: 'studioDoors/door-luxury-style-1.jpg', description: 'Collection Prestige. Une porte aux finitions soignées qui transforme votre intérieur.', description_he: 'קולקציית פרסטיז׳. דלת בגימור מוקפד שמשדרגת את חלל הבית.' },
  { id: 5, name: 'Porte Luxe Vendôme', name_he: 'דלת יוקרה ונדום', category: 'doors', image: 'studioDoors/door-luxury-style-2.jpg', description: 'Raffinement absolu avec inserts métalliques discrets pour une touche contenporaine.', description_he: 'עידון מוחלט עם שילובי מתכת עדינים למראה עכשווי.' },
  { id: 6, name: 'Porte Luxe Rivoli', name_he: 'דלת יוקרה ריבולי', category: 'doors', image: 'studioDoors/door-luxury-style-3.jpg', description: 'Lignes épurées et géométriques pour une architecture d\'intérieur sophistiquée.', description_he: 'קווים נקיים וגיאומטריים לאדריכלות פנים מתוחכמת.' },
  { id: 7, name: 'Porte Moka Fenêtre', name_he: 'דלת מוקה עם צוהר', category: 'doors', image: 'studioDoors/door-mocha-window.jpg', description: 'Teinte Moka chaleureuse avec fenêtre intégrée. Idéale pour les bureaux ou salles de bain.', description_he: 'גוון מוקה חמים עם חלון משולב. אידיאלי למשרדים או חדרי רחצה.' },
  { id: 8, name: 'Porte Nova', name_he: 'דלת נובה', category: 'doors', image: 'studioDoors/door-nova-style.jpg', description: 'Style futuriste avec motifs asymétriques. Une pièce maîtresse pour votre déco.', description_he: 'סגנון עתידני עם מוטיבים א-סימטריים. יצירת מופת לעיצוב הבית.' },
  { id: 9, name: 'Porte Noyer Foncé', name_he: 'דלת אגוז כהה', category: 'doors', image: 'studioDoors/door-walnut-dark.jpg', description: 'Classique intemporel. Aspect bois noyer profond pour une ambiance cosy et noble.', description_he: 'קלאסיקה על-זמנית. מראה עץ אגוז עמוק לאווירה חמימה ואצילית.' },
  { id: 10, name: 'Porte Noyer Lignes', name_he: 'דלת אגוז עם פסים', category: 'doors', image: 'studioDoors/door-walnut-nickel-lines.jpg', description: 'Le charme du noyer rehaussé par des lignes fines en nickel brossé.', description_he: 'הקסם של האגוז משודרג עם פסי ניקל מוברש עדינים.' },
  { id: 11, name: 'Porte Noyer Salvador', name_he: 'דלת אגוז סלבדור', category: 'doors', image: 'studioDoors/door-walnut-salvador.jpg', description: 'Texture bois riche et motifs naturels. Une robustesse à toute épreuve.', description_he: 'טקסטורת עץ עשירה ומוטיבים טבעיים. עמידות יוצאת דופן.' },
  { id: 12, name: 'Porte Noyer Minimal', name_he: 'דלת אגוז מינימל', category: 'doors', image: 'studioDoors/door-walnut-style-44.jpg', description: 'Design minimaliste en noyer. S\'adapte à tous les styles d\'intérieurs.', description_he: 'עיצוב מינימליסטי באגוז. מתאים לכל סגנונות העיצוב.' },
  { id: 13, name: 'Porte Wenge Complète', name_he: 'דלת ונגה מלאה', category: 'doors', image: 'studioDoors/door-wenge-complete.jpg', description: 'Finition Wenge sombre et élégante. Parfait pour un contraste moderne sur murs clairs.', description_he: 'גימור ונגה כהה ואלגנטי. מושלם ליצירת ניגודיות מודרנית על קירות בהירים.' },
  { id: 14, name: 'Porte Wenge Trio', name_he: 'דלת ונגה טריו', category: 'doors', image: 'studioDoors/door-wenge-style-3.jpg', description: 'Wenge texturé avec inserts horizontaux. Le luxe accessible.', description_he: 'ונגה עם טקסטורה ושילובים אופקיים. יוקרה נגישה.' },
  { id: 15, name: 'Porte Wenge Geo', name_he: 'דלת ונגה גיאומטרית', category: 'doors', image: 'studioDoors/door-wenge-style-4.jpg', description: 'Motif géométrique distinctif sur fond Wenge profond.', description_he: 'מוטיב גיאומטרי ייחודי על רקע ונגה עמוק.' },
  { id: 16, name: 'Porte Wenge Vague', name_he: 'דלת ונגה גל', category: 'doors', image: 'studioDoors/door-wenge-wave.jpg', description: 'Lignes courbes douces gravées pour un effet de mouvement apaisant.', description_he: 'קווים מעוגלים רכים חרוטים ליצירת תחושת תנועה מרגיעה.' },
  { id: 17, name: 'Porte Wenge Fenêtre', name_he: 'דלת ונגה עם צוהר', category: 'doors', image: 'studioDoors/door-wenge-window.jpg', description: 'L\'élégance du Wenge avec un vitrage vertical givré.', description_he: 'האלגנטיות של הוונגה עם זיגוג אנכי חלבי.' },
  { id: 18, name: 'Porte Blanche Classique', name_he: 'דלת לבנה קלאסית', category: 'doors', image: 'studioDoors/door-white-2-panels.png', description: 'Le standard du chic. Blanc pur avec deux panneaux moulurés classiques.', description_he: 'הסטנדרט של השיק. לבן נקי עם שני פנלים קלאסיים.' },
  { id: 19, name: 'Porte Blanche Trio', name_he: 'דלת לבנה טריו', category: 'doors', image: 'studioDoors/door-white-3-grooves.png', description: 'Simplicité moderne. Trois rainures horizontales pour structurer l\'espace.', description_he: 'פשטות מודרנית. שלושה חריצים אופקיים להגדרת החלל.' },
  { id: 20, name: 'Porte Blanche Vitrée', name_he: 'דלת לבנה מזוגגת', category: 'doors', image: 'studioDoors/door-white-glass-panel.jpg', description: 'Baignez votre pièce de lumière tout en préservant l\'intimité.', description_he: 'הציפו את החדר באור תוך שמירה על הפרטיות.' },
  { id: 21, name: 'Porte Blanche Laminato', name_he: 'דלת לבנה למינטו', category: 'doors', image: 'studioDoors/door-white-laminato.jpg', description: 'Revêtement Laminato innovation. Facile à nettoyer, impossible à tacher.', description_he: 'חיפוי למינטו חדשני. קל לניקוי, עמיד בפני כתמים.' },
  { id: 22, name: 'Porte Blanche Grande Fenêtre', name_he: 'דלת לבנה חלון גדול', category: 'doors', image: 'studioDoors/door-white-large-window.jpg', description: 'Maximisez la luminosité avec ce grand vitrage central.', description_he: 'מקסמו את התאורה עם זיגוג מרכזי גדול.' },
  { id: 23, name: 'Porte Blanche Hublot', name_he: 'דלת לבנה אשנב', category: 'doors', image: 'studioDoors/door-white-small-window.jpg', description: 'Discrétion et lumière. Un petit oculus pour voir sans être vu.', description_he: 'דיסקרטיות ואור. צוהר קטן לראות מבלי להיראות.' },
  { id: 24, name: 'Porte Blanche Horizon', name_he: 'דלת לבנה אופק', category: 'doors', image: 'studioDoors/door-white-wide-grooves.png', description: 'Design contemporain affirmé avec larges rainures horizontales.', description_he: 'עיצוב עכשווי נוכח עם חריצים אופקיים רחבים.' },

  // Accessoires - Poignées (Noms de villes italiennes pour le style)
  { id: 25, name: 'Poignée Sienna', name_he: 'ידית סיינה', category: 'accessories', image: 'studioAccessories/accessory-handle-style-1.jpg', description: 'Courbes douces et ergonomie parfaite. Finition inox satiné.', description_he: 'קווים רכים וארגונומיה מושלמת. גימור נירוסטה סאטן.' },
  { id: 26, name: 'Poignée Milano', name_he: 'ידית מילאנו', category: 'accessories', image: 'studioAccessories/accessory-handle-style-10.jpg', description: 'Le chic urbain. Design plat et moderne avec finition mate anti-trace.', description_he: 'השיק האורבני. עיצוב שטוח ומודרני בגימור מט נגד טביעות אצבע.' },
  { id: 27, name: 'Poignée Torino', name_he: 'ידית טורינו', category: 'accessories', image: 'studioAccessories/accessory-handle-style-11.jpg', description: 'Profil effilé et aérodynamique. L\'élégance de la simplicité.', description_he: 'פרופיל דק וזרום. האלגנטיות שבפשטות.' },
  { id: 28, name: 'Poignée Verona', name_he: 'ידית ורונה', category: 'accessories', image: 'studioAccessories/accessory-handle-style-12.jpg', description: 'Romantique et robuste. Une prise en main délicate pour un usage quotidien.', description_he: 'רומנטית וחזקה. אחיזה עדינה לשימוש יומיומי.' },
  { id: 29, name: 'Poignée Palermo', name_he: 'ידית פלרמו', category: 'accessories', image: 'studioAccessories/accessory-handle-style-2.jpg', description: 'Caractère affirmé. Architecture solide pour les portes massives.', description_he: 'אופי חזק. ארכיטקטורה יציבה לדלתות מסיביות.' },
  { id: 30, name: 'Poignée Firenze', name_he: 'ידית פירנצה', category: 'accessories', image: 'studioAccessories/accessory-handle-style-3.jpg', description: 'Inspiration renaissance. Un classique intemporel revisité.', description_he: 'השראת הרנסנס. קלאסיקה על-זמנית בפרשנות חדשה.' },
  { id: 31, name: 'Poignée Roma', name_he: 'ידית רומא', category: 'accessories', image: 'studioAccessories/accessory-handle-style-4.jpg', description: 'L\'essence du design. Lignes pures sans superflu.', description_he: 'תמצית העיצוב. קווים נקיים ללא מיותרים.' },
  { id: 32, name: 'Poignée Venezia', name_he: 'ידית ונציה', category: 'accessories', image: 'studioAccessories/accessory-handle-style-5.jpg', description: 'Fluidité aquatique. Un design ondulé unique qui capte la lumière.', description_he: 'זרימה מימית. עיצוב גלי ייחודי לוכד אור.' },
  { id: 33, name: 'Poignée Napoli', name_he: 'ידית נאפולי', category: 'accessories', image: 'studioAccessories/accessory-handle-style-6.jpg', description: 'Vibrante et brillante. Finition chrome miroir éclatante.', description_he: 'תוססת ומבריקה. גימור כרום מראה בוהק.' },
  { id: 34, name: 'Poignée Bologna', name_he: 'ידית בולוניה', category: 'accessories', image: 'studioAccessories/accessory-handle-style-7.jpg', description: 'Solide et fonctionnelle. Le choix pragmatique et esthétique.', description_he: 'יציבה ופונקציונלית. הבחירה הפרקטית והאסתטית.' },
  { id: 35, name: 'Poignée Modena', name_he: 'ידית מודנה', category: 'accessories', image: 'studioAccessories/accessory-handle-style-8.jpg', description: 'Géométrie cubiste. Pour les intérieurs ultra-contemporains.', description_he: 'גיאומטריה קוביסטית. לחללי פנים סופר-עכשוויים.' },
  { id: 36, name: 'Poignée Como', name_he: 'ידית קומו', category: 'accessories', image: 'studioAccessories/accessory-handle-style-9.jpg', description: 'Luxe sombre. Finition Noir Onyx profond et mystérieux.', description_he: 'יוקרה אפלה. גימור שחור אוניקס עמוק ומסתורי.' },

  // Accessoires - Quincaillerie (Noms techniques précis)
  { id: 37, name: 'Charnières 3D Invisibles', name_he: 'צירים נסתרים תלת-ממדיים', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-1.jpg', description: 'Esthétique épurée. Réglables sur 3 axes pour un alignement parfait.', description_he: 'אסתטיקה נקייה. טריקה שקטה ומתכווננים ב-3 צירים להתאמה מושלמת.' },
  { id: 38, name: 'Serrure Magnétique Silencieuse', name_he: 'מנעול מגנטי שקט', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-10.jpg', description: 'Fermeture automatique sans bruit de claquement. Le silence est d\'or.', description_he: 'סגירה אוטומטית ללא רעש טריקה. השקט שווה זהב.' },
  { id: 39, name: 'Butoir de Sol Design', name_he: 'מעצור רצפה מעוצב', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-11.jpg', description: 'Protection discrète. Empêche la porte de heurter le mur avec élégance.', description_he: 'הגנה דיסקרטית. מונע מהדלת לפגוע בקיר באלגנטיות.' },
  { id: 40, name: 'Kit de Pose Universel', name_he: 'ערכת התקנה אוניברסלית', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-12.jpg', description: 'Tout le nécessaire pour une installation professionnelle et durable.', description_he: 'כל הדרוש להתקנה מקצועית ועמידה לאורך זמן.' },
  { id: 41, name: 'Rosaces de Fonction', name_he: 'רוזטות פונקציונליות', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-13.jpg', description: 'Habillage élégant pour trous de clé ou condamnation.', description_he: 'חיפוי אלגנטי לחורי מפתח או נעילה.' },
  { id: 42, name: 'Cylindre Haute Sécurité', name_he: 'צילינדר ביטחון גבוה', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-14.jpg', description: 'Protection renforcée avec clés incopiables et système anti-perçage.', description_he: 'הגנה מוגברת עם מפתחות מוגנים ומערכת נגד קידוח.' },
  { id: 43, name: 'Verrou de Condamnation WC', name_he: 'מנעול תפוס/פנוי', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-15.jpg', description: 'Système simple et esthétique pour salles de bain et toilettes.', description_he: 'מערכת פשוטה ואסתטית לחדרי רחצה ושירותים.' },
  { id: 44, name: 'Set de Fixation Pro', name_he: 'סט קיבוע מקצועי', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-16.jpg', description: 'Visserie et chevilles haute performance pour tous supports.', description_he: 'ברגים ודיבלים בעלי ביצועים גבוהים לכל סוגי הקירות.' },
  { id: 45, name: 'Amortisseur Soft-Close', name_he: 'בולם טריקה רכה', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-2.jpg', description: 'Finies les portes qui claquent. Ralentit la course en douceur.', description_he: 'נגמרו הטריקות. מאט את תנועת הדלת ברכות.' },
  { id: 46, name: 'Gâche Réglable Inox', name_he: 'נגדי מתכוונן נירוסטה', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-3.jpg', description: 'Ajustement précis de la fermeture. Matériau inaltérable.', description_he: 'כיוון מדויק של הסגירה. חומר עמיד בפני חלודה.' },
  { id: 47, name: 'Seuil de Porte Alu', name_he: 'סף דלת אלומיניום', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-4.jpg', description: 'Transition propre entre les pièces. Finition brossée.', description_he: 'מעבר נקי בין החדרים. גימור מוברש.' },
  { id: 48, name: 'Paumelles Renforcées', name_he: 'צירים מחוזקים', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-5.jpg', description: 'Pour portes lourdes ou usage intensif. Robustesse maximale.', description_he: 'לדלתות כבדות או שימוש אינטנסיבי. עמידות מקסימלית.' },
  { id: 49, name: 'Gabarit de Perçage', name_he: 'שבלונת קידוח', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-6.jpg', description: 'Outil pour une pose de poignée parfaitement alignée.', description_he: 'כלי להתקנת ידית מיושרת להפליא.' },
  { id: 50, name: 'Poignée de Tirage Bâton', name_he: 'ידית משיכה באטון', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-7.jpg', description: 'Pour portes coulissantes ou pivotantes. Design tubulaire moderne.', description_he: 'לדלתות הזזה או ציר. עיצוב צינורי מודרני.' },
  { id: 51, name: 'Joint Isophonique', name_he: 'אטם בידוד רעשים', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-8.jpg', description: 'Améliore l\'isolation acoustique de votre bloc-porte.', description_he: 'משפר את הבידוד האקוסטי של הדלת.' },
  { id: 52, name: 'Kit Rénovation', name_he: 'ערכת שיפוץ', category: 'accessories', image: 'studioAccessories/accessory-hardware-style-9.jpg', description: 'Solution complète pour remettre à neuf une porte existante.', description_he: 'פתרון מלא לחידוש דלת קיימת.' }
];

async function sync() {
  console.log('Starting sync...');
  for (const p of products) {
    console.log(`Updating ${p.name}...`);
    const { error } = await supabase
      .from('products')
      .update({ 
        name: p.name,
        name_he: p.name_he,
        description: p.description,
        description_he: p.description_he 
      })
      .eq('image', p.image);
    
    if (error) {
      console.error(`Error syncing ${p.name}:`, error.message);
    }
  }
  console.log('Sync complete!');
  process.exit(0);
}

sync();

'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  fr: {
    // Navigation
    nav_home: 'Accueil',
    nav_doors: 'Portes',
    nav_accessories: 'Accessoires',
    nav_warranty: 'Garantie',
    nav_contact: 'Contact',
    nav_about: 'À Propos',
    nav_services: 'Services',
    nav_ranges: 'Nos Gammes',

    // About Page
    about_title: "Gad Dlatot – Importateur Direct & Expert",
    about_subtitle: "18 ans d'excellence dans la porte d'intérieur",
    about_exp_title: "18 Ans d'Expérience",
    about_exp_desc: "Une expertise reconnue dans l'importation et la distribution de portes en Israël.",
    about_origin_title: "Importation Directe",
    about_origin_desc: "Italie pour le design, Chine pour la technologie. Sans aucun intermédiaire.",
    about_force_title: "Maîtrise Totale",
    about_force_desc: "De l'usine jusqu'à l'installation chez vous. Nous contrôlons toute la chaîne.",
    about_exp_hover: "Depuis 2007, nous avons installé plus de 50 000 portes à travers Israël. Notre longévité est votre meilleure garantie de fiabilité et de suivi.",
    about_origin_hover: "Nous sélectionnons personnellement chaque modèle en Italie pour son style unique, et en Chine pour les meilleures innovations WPC. Aucun intermédiaire = Meilleur prix.",
    about_force_hover: "Pas de sous-traitants douteux. Nos propres équipes gèrent la logistique, le stockage et la pose. Un seul interlocuteur pour une tranquillité d'esprit totale.",
    
    // Services Page
    services_title: "Service Tout Inclus",
    services_subtitle: "Transparence totale, zéro surprise",
    service_consult_title: "Visite Conseil",
    service_consult_desc: "Expert à domicile pour choisir le modèle adapté.",
    service_measure_title: "Métré Laser",
    service_measure_desc: "Prise de mesure professionnelle pour une précision parfaite.",
    service_removal_title: "Démontage Inclus",
    service_removal_desc: "Retrait de vos anciennes portes compris dans le prix !",
    service_install_title: "Installation Pro",
    service_install_desc: "Montage complet de la porte et des chambranles.",
    
    // Product Details
    wpc_title: "WPC - La Star",
    wpc_subtitle: "Le choix n°1 pour les foyers israéliens",
    wpc_comp: "Composition : WPC (Wood Plastic Composite) – Alliage haute densité.",
    wpc_resist: "Résistance : 100% Hydrofuge et Anti-termites. Idéal pour le nettoyage à grande eau.",
    wpc_iso: "Isolation : Joint périphérique acoustique supérieur.",
    wpc_warranty: "Garantie : 7 ans (Eau/Termites) + 1 an (Mécanisme).",
    
    formica_title: "Formica - La Robuste",
    formica_subtitle: "Pour les zones à fort passage",
    formica_comp: "Surface : Revêtement stratifié haute pression.",
    formica_resist: "Point Fort : Résistance exceptionnelle aux rayures et aux chocs.",
    formica_design: "Design : Textures variées (bois, béton).",
    
    pvc_title: "PVC - L'Économique",
    pvc_subtitle: "Le budget maîtrisé",
    pvc_usage: "Usage : Idéal pour locatif et rénovation.",
    pvc_maint: "Entretien : Facile à nettoyer.",
    
    // Technical Options
    tech_title: "Personnalisation & Options",
    tech_locks_title: "Serrures & Mécanismes",
    lock_mag: "Magnétique : Silencieuse et esthétique.",
    lock_butterfly: "Papillon (Parpar) : Pour SDB/WC.",
    lock_key: "Clé Standard : Pour chambres.",
    lock_cyl: "Cylindre : Sécurité renforcée (bureaux).",
    lock_lang: "Languette : Mécanisme classique éprouvé.",
    
    tech_design_title: "Design & Esthétique",
    colors_avail: "Couleurs : Blanc Pur, Crème, Gris Moderne, Noyer, Chêne Blanchi.",
    frames_desc: "Cadres (Mashkofim) : 100% Polymère (ne gonflent pas).",
    
    // Comparator
    comp_title: "Comparateur de Gammes",
    comp_water: "Résistance Eau",
    comp_scratch: "Résistance Rayures",
    comp_price: "Budget",
    comp_warranty: "Garantie",
    hero_title: "L'Élégance à Chaque Ouverture",
    hero_subtitle:
      "Découvrez notre collection exclusive de portes d'intérieur haut de gamme.",
    hero_cta: 'Voir la Collection',
    cat_doors: 'Nos Portes',
    cat_acc: 'Accessoires',
    btn_discover: 'Découvrir',
    
    // New Home Content
    expertise_banner: "18 ans d'expérience dans l'importation directe de portes d'intérieur",
    
    // Why Choose Us
    why_title: "Pourquoi Choisir GadDoors ?",
    why_subtitle: "L'excellence de l'importation directe au service de votre intérieur",
    why_1_title: "Importation Directe",
    why_1_desc: "Italie (Design) & Chine (Technologie) sans intermédiaires.",
    why_2_title: "Service Clés en Main",
    why_2_desc: "Conseil, métré, démontage et installation inclus.",
    why_3_title: "Garantie 7 Ans",
    why_3_desc: "Sur nos portes WPC contre l'eau et les termites.",
    why_4_title: "Prix Transparent",
    why_4_desc: "Tout est inclus, pas de surprises.",
    
    // Ranges
    ranges_title: "Nos Gammes de Portes",
    ranges_subtitle: "Découvrez nos collections adaptées à tous les besoins",
    range_wpc_title: "WPC - La Star",
    range_wpc_desc: "100% Hydrofuge & Anti-termites. Le choix n°1 en Israël.",
    range_formica_title: "Formica - La Robuste",
    range_formica_desc: "Haute résistance aux rayures pour zones à fort passage.",
    range_pvc_title: "PVC - L'Économique",
    range_pvc_desc: "Idéal pour locatif et petits budgets.",
    btn_view_ranges: "Voir toutes nos gammes",
    btn_service_all_inclusive: "Découvrir notre Service Tout Inclus",
    why_title: 'Pourquoi Choisir GadDoors ?',
    why_subtitle:
      'Nous allions design moderne, matériaux de qualité supérieure et service client exceptionnel pour transformer votre intérieur.',
    why_1_title: 'Design Premium',
    why_1_desc: "Des styles qui s'adaptent à tous les intérieurs.",
    why_2_title: 'Garantie Fiable',
    why_2_desc: "Une tranquillité d'esprit assurée sur tous nos produits.",
    why_3_title: 'Installation Pro',
    why_3_desc: "Service d'installation rapide et soigné.",
    footer_desc: "Votre spécialiste en portes d'intérieur de qualité.",
    footer_links: 'Liens Rapides',
    footer_contact: 'Contact',
    contact_title: 'Contactez-nous',
    contact_subtitle: 'Une question ? Un devis ? Nous sommes à votre écoute.',
    contact_address: 'Adresse',
    contact_phone: 'Téléphone',
    contact_email: 'Email',
    form_name: 'Nom Complet',
    form_email: 'Email',
    form_msg: 'Message',
    form_send: 'Envoyer',
    warranty_title: 'Notre Engagement Qualité',
    warranty_subtitle: 'Votre satisfaction est notre priorité absolue.',
    warranty_1_title: 'Garantie 5 Ans',
    warranty_1_desc:
      "Toutes nos portes d'intérieur sont couvertes par une garantie de 5 ans contre tout défaut de fabrication. Nous nous engageons à remplacer ou réparer tout produit ne répondant pas à nos standards de qualité rigoureux.",
    warranty_2_title: "Résistance à l'Eau",
    warranty_2_desc:
      'Nos portes de la gamme "Hydro" sont spécialement conçues pour résister à l\'humidité, idéales pour les salles de bains et les environnements humides. Garantie spécifique de 7 ans sur l\'étanchéité.',
    warranty_3_title: 'Installation',
    warranty_3_desc:
      "L'installation effectuée par nos équipes certifiées est garantie 1 an. Nous assurons un ajustement parfait et un fonctionnement fluide de vos portes.",
    doors_page_title: "Nos Portes d'Intérieur",
    accessories_page_title: 'Accessoires & Poignées',
    admin_title: 'Administration',
    admin_login: 'Se Connecter',
    admin_dashboard: 'Tableau de Bord',
    admin_add: 'Ajouter Produit',
    admin_edit: 'Modifier',
    admin_delete: 'Supprimer',
    admin_save: 'Sauvegarder',
    admin_cancel: 'Annuler',
    admin_logout: 'Déconnexion',
    admin_view_site: 'Voir le Site',
    admin_hide: 'Cacher',
    admin_show: 'Afficher',
  },
  he: {
    // Navigation
    nav_home: 'בית',
    nav_doors: 'דלתות',
    nav_accessories: 'אביזרים',
    nav_warranty: 'אחריות',
    nav_contact: 'צור קשר',
    nav_about: 'אודות',
    nav_services: 'שירותים',
    nav_ranges: 'הקולקציות שלנו',

    // About Page
    about_title: "גד דלתות – יבואן ישיר ומומחה",
    about_subtitle: "18 שנות מצוינות בדלתות פנים",
    about_exp_title: "18 שנות ניסיון",
    about_exp_desc: "מומחיות מוכחת ביבוא ושיווק דלתות בישראל.",
    about_origin_title: "יבוא ישיר",
    about_origin_desc: "איטליה לעיצוב, סין לטכנולוגיה. ללא מתווכים.",
    about_force_title: "שליטה מלאה",
    about_force_desc: "מהמפעל ועד ההתקנה אצלכם. אנו שולטים בכל השרשרת.",
    about_exp_hover: "מאז 2007, התקנו מעל 50,000 דלתות ברחבי ישראל. הוותק שלנו הוא האחריות הטובה ביותר לאמינות ושירות.",
    about_origin_hover: "אנו בוחרים אישית כל דגם באיטליה עבור העיצוב, ובסין עבור החדשנות. ללא מתווכים = המחיר הטוב ביותר.",
    about_force_hover: "ללא קבלני משנה. הצוותים שלנו מנהלים את הלוגיסטיקה, האחסון וההתקנה. כתובת אחת לשקט נפשי מלא.",

    // Services Page
    services_title: "שירות הכל כלול",
    services_subtitle: "שקיפות מלאה, ללא הפתעות",
    service_consult_title: "ביקור ייעוץ",
    service_consult_desc: "מומחה עד הבית לבחירת הדגם המתאים.",
    service_measure_title: "מדידת לייזר",
    service_measure_desc: "מדידה מקצועית לדיוק מושלם.",
    service_removal_title: "פירוק כלול",
    service_removal_desc: "פינוי הדלתות הישנות כלול במחיר!",
    service_install_title: "התקנה מקצועית",
    service_install_desc: "הרכבה מלאה של הדלת והמשקופים.",

    // Product Details
    wpc_title: "פולימר - הכוכב",
    wpc_subtitle: "הבחירה מס' 1 לבית הישראלי",
    wpc_comp: "הרכב: WPC (Wood Plastic Composite) – סגסוגת צפופה.",
    wpc_resist: "עמידות: 100% עמיד למים וטרמיטים. אידיאלי לשטיפה.",
    wpc_iso: "בידוד: אטם היקפי לבידוד אקוסטי משופר.",
    wpc_warranty: "אחריות: 7 שנים (מים/טרמיטים) + שנה (מנגנון).",

    formica_title: "פורמייקה - החזקה",
    formica_subtitle: "לאזורים עם תנועה רבה",
    formica_comp: "משטח: ציפוי פורמייקה בלחץ גבוה.",
    formica_resist: "יתרון: עמידות יוצאת דופן לשריטות ומכות.",
    formica_design: "עיצוב: מגוון טקסטורות (עץ, בטון).",

    pvc_title: "PVC - המשתלמת",
    pvc_subtitle: "תקציב מבוקר",
    pvc_usage: "שימוש: אידיאלי לדירות שכורות ושיפוץ.",
    pvc_maint: "תחזוקה: קל לניקוי.",

    // Technical Options
    tech_title: "התאמה אישית ואפשרויות",
    tech_locks_title: "מנעולים ומנגנונים",
    lock_mag: "מגנטי: שקט ואסתטי.",
    lock_butterfly: "פרפר (תפוס/פנוי): לשירותים/מקלחת.",
    lock_key: "מפתח רגיל: לחדרי שינה.",
    lock_cyl: "צילינדר: ביטחון מוגבר (משרדים).",
    lock_lang: "לשונית: מנגנון מכאני קלאסי.",

    tech_design_title: "עיצוב ואסתטיקה",
    colors_avail: "צבעים: לבן, שמנת, אפור מודרני, אגוז, אלון מולבן.",
    frames_desc: "משקופים: 100% פולימר (לא מתנפחים).",

    // Comparator
    comp_title: "השוואת דגמים",
    comp_water: "עמידות למים",
    comp_scratch: "עמידות לשריטות",
    comp_price: "תקציב",
    comp_warranty: "אחריות",
    hero_title: 'אלגנטיות בכל פתיחה',
    hero_subtitle: 'גלה את הקולקציה הבלעדית שלנו של דלתות פנים יוקרתיות.',
    hero_cta: 'צפה בקולקציה',
    cat_doors: 'הדלתות שלנו',
    cat_acc: 'אביזרים',
    btn_discover: 'גלה עוד',

    // New Home Content
    expertise_banner: "18 שנות ניסיון ביבוא ישיר של דלתות פנים",

    // Why Choose Us
    why_title: "למה לבחור בגד דורס?",
    why_subtitle: "מצוינות ביבוא ישיר לשירות הבית שלך",
    why_1_title: "יבוא ישיר",
    why_1_desc: "איטליה (עיצוב) וסין (טכנולוגיה) ללא מתווכים.",
    why_2_title: "שירות עד המפתח",
    why_2_desc: "ייעוץ, מדידה, פירוק והתקנה כלולים.",
    why_3_title: "7 שנות אחריות",
    why_3_desc: "על דלתות הפולימר שלנו נגד מים וטרמיטים.",
    why_4_title: "מחיר שקוף",
    why_4_desc: "הכל כלול, ללא הפתעות.",

    // Ranges
    ranges_title: "הקולקציות שלנו",
    ranges_subtitle: "גלו את הקולקציות שלנו המותאמות לכל צורך",
    range_wpc_title: "פולימר - הכוכב",
    range_wpc_desc: "100% חסין מים ונגד טרמיטים. הבחירה מס' 1 בישראל.",
    range_formica_title: "פורמייקה - החזק",
    range_formica_desc: "עמידות גבוהה לשריטות לאזורי מעבר אינטנסיבי.",
    range_pvc_title: "PVC - הכלכלי",
    range_pvc_desc: "אידיאלי להשכרה ולתקציבים קטנים.",
    btn_view_ranges: "צפו בכל הקולקציות",
    btn_service_all_inclusive: "גלו את השירות הכל-כלול שלנו",
    why_title: 'למה לבחור ב-GadDoors?',
    why_subtitle:
      'אנו משלבים עיצוב מודרני, חומרים איכותיים ושירות לקוחות יוצא דופן כדי לשדרג את הבית שלך.',
    why_1_title: 'עיצוב פרימיום',
    why_1_desc: 'סגנונות המתאימים לכל חלל.',
    why_2_title: 'אחריות אמינה',
    why_2_desc: 'שקט נפשי מובטח לכל המוצרים שלנו.',
    why_3_title: 'התקנה מקצועית',
    why_3_desc: 'שירות התקנה מהיר ומקצועי.',
    footer_desc: 'המומחים שלך לדלתות פנים איכותיות.',
    footer_links: 'קישורים מהירים',
    footer_contact: 'צור קשר',
    contact_title: 'צור קשר',
    contact_subtitle: 'יש לך שאלה? מעוניין בהצעת מחיר? אנחנו כאן לשירותך.',
    contact_address: 'כתובת',
    contact_phone: 'טלפון',
    contact_email: 'אימייל',
    form_name: 'שם מלא',
    form_email: 'אימייל',
    form_msg: 'הודעה',
    form_send: 'שלח',
    warranty_title: 'המחויבות שלנו לאיכות',
    warranty_subtitle: 'שביעות הרצון שלך היא בראש סדר העדיפויות שלנו.',
    warranty_1_title: '5 שנות אחריות',
    warranty_1_desc:
      'כל דלתות הפנים שלנו מכוסות באחריות של 5 שנים נגד פגמי ייצור. אנו מתחייבים להחליף או לתקן כל מוצר שאינו עומד בסטנדרטים הקפדניים שלנו.',
    warranty_2_title: 'עמידות למים',
    warranty_2_desc:
      "דלתות מסדרת 'הידרו' שלנו תוכננו במיוחד לעמידות בפני לחות, אידיאליות לחדרי רחצה וסביבות לחות. אחריות מיוחדת של 7 שנים על אטימות.",
    warranty_3_title: 'התקנה',
    warranty_3_desc:
      'ההתקנה המבוצעת על ידי הצוותים המוסמכים שלנו מגיעה עם שנת אחריות אחת. אנו מבטיחים התאמה מושלמת ופעולה חלקה של הדלתות שלך.',
    doors_page_title: 'דלתות הפנים שלנו',
    accessories_page_title: 'אביזרים וידיות',
    admin_title: 'ניהול',
    admin_login: 'התחבר',
    admin_dashboard: 'לוח בקרה',
    admin_add: 'הוסף מוצר',
    admin_edit: 'ערוך',
    admin_delete: 'מחק',
    admin_save: 'שמור',
    admin_cancel: 'ביטול',
    admin_logout: 'התנתק',
    admin_view_site: 'צפה באתר',
    admin_hide: 'הסתר',
    admin_show: 'הצג',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('fr');
  const dir = language === 'he' ? 'rtl' : 'ltr';

  useEffect(() => {
    const savedLang = localStorage.getItem('gadDoorsLang');
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gadDoorsLang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'fr' ? 'he' : 'fr'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, dir, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

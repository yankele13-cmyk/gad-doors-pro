"use client";

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    fr: {
        nav_home: "Accueil",
        nav_doors: "Portes",
        nav_accessories: "Accessoires",
        nav_warranty: "Garantie",
        nav_contact: "Contact",
        hero_title: "L'Élégance à Chaque Ouverture",
        hero_subtitle: "Découvrez notre collection exclusive de portes d'intérieur haut de gamme.",
        hero_cta: "Voir la Collection",
        cat_doors: "Nos Portes",
        cat_acc: "Accessoires",
        btn_discover: "Découvrir",
        why_title: "Pourquoi Choisir GadDoors ?",
        why_subtitle: "Nous allions design moderne, matériaux de qualité supérieure et service client exceptionnel pour transformer votre intérieur.",
        why_1_title: "Design Premium",
        why_1_desc: "Des styles qui s'adaptent à tous les intérieurs.",
        why_2_title: "Garantie Fiable",
        why_2_desc: "Une tranquillité d'esprit assurée sur tous nos produits.",
        why_3_title: "Installation Pro",
        why_3_desc: "Service d'installation rapide et soigné.",
        footer_desc: "Votre spécialiste en portes d'intérieur de qualité.",
        footer_links: "Liens Rapides",
        footer_contact: "Contact",
        contact_title: "Contactez-nous",
        contact_subtitle: "Une question ? Un devis ? Nous sommes à votre écoute.",
        contact_address: "Adresse",
        contact_phone: "Téléphone",
        contact_email: "Email",
        form_name: "Nom Complet",
        form_email: "Email",
        form_msg: "Message",
        form_send: "Envoyer",
        warranty_title: "Notre Engagement Qualité",
        warranty_subtitle: "Votre satisfaction est notre priorité absolue.",
        warranty_1_title: "Garantie 5 Ans",
        warranty_1_desc: "Toutes nos portes d'intérieur sont couvertes par une garantie de 5 ans contre tout défaut de fabrication. Nous nous engageons à remplacer ou réparer tout produit ne répondant pas à nos standards de qualité rigoureux.",
        warranty_2_title: "Résistance à l'Eau",
        warranty_2_desc: "Nos portes de la gamme \"Hydro\" sont spécialement conçues pour résister à l'humidité, idéales pour les salles de bains et les environnements humides. Garantie spécifique de 7 ans sur l'étanchéité.",
        warranty_3_title: "Installation",
        warranty_3_desc: "L'installation effectuée par nos équipes certifiées est garantie 1 an. Nous assurons un ajustement parfait et un fonctionnement fluide de vos portes.",
        doors_page_title: "Nos Portes d'Intérieur",
        accessories_page_title: "Accessoires & Poignées",
        admin_title: "Administration",
        admin_login: "Se Connecter",
        admin_dashboard: "Tableau de Bord",
        admin_add: "Ajouter Produit",
        admin_edit: "Modifier",
        admin_delete: "Supprimer",
        admin_save: "Sauvegarder",
        admin_cancel: "Annuler",
        admin_logout: "Déconnexion",
        admin_view_site: "Voir le Site",
        admin_hide: "Cacher",
        admin_show: "Afficher"
    },
    he: {
        nav_home: "בית",
        nav_doors: "דלתות",
        nav_accessories: "אביזרים",
        nav_warranty: "אחריות",
        nav_contact: "צור קשר",
        hero_title: "אלגנטיות בכל פתיחה",
        hero_subtitle: "גלה את הקולקציה הבלעדית שלנו של דלתות פנים יוקרתיות.",
        hero_cta: "צפה בקולקציה",
        cat_doors: "הדלתות שלנו",
        cat_acc: "אביזרים",
        btn_discover: "גלה עוד",
        why_title: "למה לבחור ב-GadDoors?",
        why_subtitle: "אנו משלבים עיצוב מודרני, חומרים איכותיים ושירות לקוחות יוצא דופן כדי לשדרג את הבית שלך.",
        why_1_title: "עיצוב פרימיום",
        why_1_desc: "סגנונות המתאימים לכל חלל.",
        why_2_title: "אחריות אמינה",
        why_2_desc: "שקט נפשי מובטח לכל המוצרים שלנו.",
        why_3_title: "התקנה מקצועית",
        why_3_desc: "שירות התקנה מהיר ומקצועי.",
        footer_desc: "המומחים שלך לדלתות פנים איכותיות.",
        footer_links: "קישורים מהירים",
        footer_contact: "צור קשר",
        contact_title: "צור קשר",
        contact_subtitle: "יש לך שאלה? מעוניין בהצעת מחיר? אנחנו כאן לשירותך.",
        contact_address: "כתובת",
        contact_phone: "טלפון",
        contact_email: "אימייל",
        form_name: "שם מלא",
        form_email: "אימייל",
        form_msg: "הודעה",
        form_send: "שלח",
        warranty_title: "המחויבות שלנו לאיכות",
        warranty_subtitle: "שביעות הרצון שלך היא בראש סדר העדיפויות שלנו.",
        warranty_1_title: "5 שנות אחריות",
        warranty_1_desc: "כל דלתות הפנים שלנו מכוסות באחריות של 5 שנים נגד פגמי ייצור. אנו מתחייבים להחליף או לתקן כל מוצר שאינו עומד בסטנדרטים הקפדניים שלנו.",
        warranty_2_title: "עמידות למים",
        warranty_2_desc: "דלתות מסדרת 'הידרו' שלנו תוכננו במיוחד לעמידות בפני לחות, אידיאליות לחדרי רחצה וסביבות לחות. אחריות מיוחדת של 7 שנים על אטימות.",
        warranty_3_title: "התקנה",
        warranty_3_desc: "ההתקנה המבוצעת על ידי הצוותים המוסמכים שלנו מגיעה עם שנת אחריות אחת. אנו מבטיחים התאמה מושלמת ופעולה חלקה של הדלתות שלך.",
        doors_page_title: "דלתות הפנים שלנו",
        accessories_page_title: "אביזרים וידיות",
        admin_title: "ניהול",
        admin_login: "התחבר",
        admin_dashboard: "לוח בקרה",
        admin_add: "הוסף מוצר",
        admin_edit: "ערוך",
        admin_delete: "מחק",
        admin_save: "שמור",
        admin_cancel: "ביטול",
        admin_logout: "התנתק",
        admin_view_site: "צפה באתר",
        admin_hide: "הסתר",
        admin_show: "הצג"
    }
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
        setLanguage(prev => prev === 'fr' ? 'he' : 'fr');
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

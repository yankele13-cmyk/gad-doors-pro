# Plan de Développement - Projet GadDoors

Ce document détaille les prochaines étapes pour finaliser le développement du site GadDoors, le rendre entièrement fonctionnel, maintenable et prêt pour la production. Les tâches sont organisées par phase et par ordre de priorité.

---

## 🚀 Phase 1 : Fonctionnalités Critiques & Données

### 1. Intégration de Supabase pour les Données Produits

- **Statut :** ⏸️ En pause (Priorité changée par l'utilisateur)
- **Priorité :** 🟡 MOYENNE
- **Constat :** Les produits sont actuellement codés en dur. L'utilisateur préfère d'abord gérer les contacts.
- **Actions Clés :**
  - [ ] Configurer le client Supabase dans `src/lib/supabase.js`.
  - [ ] Créer la table `products`.
  - [ ] Migrer les données.

### 2. Finalisation du Formulaire de Contact (Google Sheets)

- **Statut :** 🧪 En test
- **Priorité :** 🔥 CRITIQUE
- **Constat :** L'intégration est codée. En attente de validation par l'utilisateur.
- **Actions Clés :**
  - [x] Configurer un projet Google Cloud et activer l'API Google Sheets.
  - [x] Créer un compte de service et récupérer les identifiants (JSON).
  - [x] Installer `googleapis`.
  - [x] Connecter la route API `/api/contact` à Google Sheets.
  - [ ] Tester l'envoi de données.

### 3. Mise en Place de l'Authentification Admin

- **Statut :** ⏳ À faire
- **Priorité :** 🟠 IMPORTANT
- **Constat :** La section `/admin` est actuellement publique et non protégée.
- **Actions Clés :**
  - [ ] Configurer Supabase Auth.
  - [ ] Créer une page de connexion (`/admin/login`).
  - [ ] Protéger les routes de l'administration (`/admin/dashboard/*`) via un middleware ou un `AuthGuard` qui vérifie la session de l'utilisateur.

### 4. Construction de l'Interface d'Administration (CRUD)

- **Statut :** ⏳ À faire
- **Priorité :** 🟠 IMPORTANT
- **Constat :** L'interface est nécessaire pour la gestion des produits sans intervention dans le code.
- **Actions Clés :**
  - [ ] Développer l'interface pour lister tous les produits dans `ProductTable.js`.
  - [ ] Implémenter la logique de création et de modification de produits en utilisant `ProductModal.js`.
  - [ ] Ajouter la fonctionnalité de suppression avec une confirmation.
  - [ ] Intégrer la gestion des images (upload vers Supabase Storage).

---

## 🛠️ Phase 2 : Qualité du Code & Maintenance

### 5. Externalisation des Traductions

- **Statut :** ⏳ À faire
- **Priorité :** 🟡 RECOMMANDÉ
- **Constat :** Le fichier `LanguageContext.js` contient toutes les chaînes de caractères, ce qui le rendra difficile à maintenir.
- **Actions Clés :**
  - [ ] Créer un dossier `src/locales`.
  - [ ] Créer les fichiers `fr.json` et `he.json` et y migrer les traductions.
  - [ ] Mettre à jour `LanguageContext.js` pour charger dynamiquement le bon fichier JSON en fonction de la langue sélectionnée.

### 6. Standardisation de la Stratégie de Style

- **Statut :** ⏳ À faire
- **Priorité :** 🟡 RECOMMANDÉ
- **Constat :** Un mélange de CSS vanilla et de Tailwind peut entraîner des incohérences et des conflits.
- **Actions Clés :**
  - [ ] Décider d'une approche unique (privilégier Tailwind car il est déjà configuré).
  - [ ] Remplacer progressivement les styles inline et les classes CSS personnalisées par des classes utilitaires Tailwind.
  - [ ] S'assurer de la cohérence du design sur l'ensemble du site.

### 7. Gestion Centralisée des Variables d'Environnement

- **Statut :** ✅ En place (à maintenir)
- **Priorité :** 🟢 BONNE PRATIQUE
- **Constat :** Le projet utilisera des clés secrètes pour Supabase et l'envoi d'emails.
- **Actions Clés :**
  - [ ] S'assurer que TOUTES les clés secrètes et configurations sensibles sont stockées dans `.env.local`.
  - [ ] Mettre à jour le fichier `docs/ENV_TEMPLATE.md` à chaque ajout de nouvelle variable.

---

## ⚡ Phase 3 : Optimisation & SEO

### 8. Amélioration du SEO Dynamique

- **Statut :** ⏳ À faire
- **Priorité :** 🟠 IMPORTANT
- **Constat :** Les pages dynamiques (produits) nécessitent des métadonnées SEO spécifiques pour un bon référencement.
- **Actions Clés :**
  - [ ] Utiliser la fonction `generateMetadata` de Next.js dans les pages de détails de produits.
  - [ ] Générer dynamiquement les balises `<title>` et `<meta name="description">` pour chaque produit.
  - [ ] Mettre en place un `sitemap.xml` dynamique.

### 9. Optimisation des Images et Polices

- **Statut :** ⏳ À faire
- **Priorité :** 🟡 RECOMMANDÉ
- **Constat :** L'utilisation correcte des outils d'optimisation de Next.js est essentielle pour les performances.
- **Actions Clés :**
  - [ ] Auditer toutes les balises `<img>` et s'assurer qu'elles sont remplacées par le composant `<Image>` de Next.js.
  - [ ] Vérifier que les polices (Google Fonts) sont bien chargées via `next/font` dans le layout principal.

### 10. Amélioration de l'Accessibilité (a11y)

- **Statut :** ⏳ À faire
- **Priorité :** 🟢 BONNE PRATIQUE
- **Constat :** Un site professionnel doit être accessible à tous les utilisateurs.
- **Actions Clés :**
  - [ ] Vérifier que toutes les images ont des attributs `alt` descriptifs.
  - [ ] S'assurer que tous les éléments interactifs (boutons, liens) sont accessibles au clavier.
  - [ ] Utiliser des outils comme Lighthouse ou Axe pour identifier et corriger les problèmes d'accessibilité.

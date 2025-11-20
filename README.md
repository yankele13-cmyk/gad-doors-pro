# Gad-Doors - Site Web Next.js

Site web professionnel pour Gad-Doors, spécialiste en portes d'intérieur premium. Application Next.js moderne avec support multilingue (Français/Hébreu) et design responsive.

## 📚 Documentation

- **[Guide Admin](docs/ADMIN_GUIDE.md)** - Utilisation du panneau d'administration
- **[Setup Email](docs/EMAIL_SETUP.md)** - Configuration envoi d'emails
- **[Variables d'Environnement](docs/ENV_TEMPLATE.md)** - Template configuration

## 🌟 Caractéristiques

- ✅ **Next.js 16** avec Turbopack
- ✅ **Multilingue** : Français / Hébreu avec support RTL
- ✅ **Responsive Design** : Mobile, tablette, desktop
- ✅ **Optimisation d'images** : Next.js Image Component
- ✅ **SEO Optimisé** : Metadata dynamiques
- ✅ **Design Premium** : CSS moderne avec animations
- ✅ **WhatsApp Integration** : Widget de contact direct

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+ installé
- npm ou yarn

### Installation

```bash
# Cloner le projet
cd gad-doors-pro

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
gad-doors-pro/
├── public/
│   └── images/          # Images des produits
├── src/
│   ├── app/            # Pages Next.js (App Router)
│   │   ├── page.js           # Page d'accueil
│   │   ├── doors/            # Page Portes
│   │   ├── accessories/      # Page Accessoires
│   │   ├── contact/          # Page Contact
│   │   └── warranty/         # Page Garantie
│   ├── components/     # Composants réutilisables
│   │   ├── Header.js         # En-tête avec navigation
│   │   ├── Footer.js         # Pied de page
│   │   ├── ProductCard.js    # Carte produit
│   │   └── ClientLayout.js   # Layout client (lang dynamique)
│   ├── context/        # React Context
│   │   └── LanguageContext.js  # Gestion langue FR/HE
│   ├── config/         # Configuration
│   │   └── siteConfig.js     # Infos de contact centralisées
│   ├── data/           # Données locales (temporaire)
│   │   └── products.js       # Produits (en attendant Supabase)
│   └── lib/            # Utilitaires
│       └── supabase.js       # Client Supabase (futur)
└── package.json
```

## 🔧 Configuration

### Variables d'Environnement (Futur)

Créer un fichier `.env.local` à la racine :

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> **Note**: Actuellement, le projet utilise des données locales (`src/data/products.js`). Supabase sera intégré ultérieurement.

### Informations de Contact

Modifier `src/config/siteConfig.js` pour mettre à jour :

- Numéro de téléphone
- Email
- Adresse
- Lien WhatsApp

## 🛠️ Commandes Disponibles

```bash
# Développement
npm run dev          # Démarre le serveur de développement (port 3000)

# Production
npm run build        # Crée un build optimisé
npm run start        # Lance le serveur de production

# Qualité du code
npm run lint         # Vérifie les erreurs ESLint
```

## 🌐 Localisation

Le site supporte le **français** et l'**hébreu** avec :

- Traductions complètes dans `src/context/LanguageContext.js`
- Support RTL automatique pour l'hébreu
- Changement de langue via bouton dans le header
- Attribut HTML `lang` dynamique

### Ajouter une Traduction

Éditer `src/context/LanguageContext.js` :

```javascript
const translations = {
  fr: {
    nouvelle_cle: 'Texte en français',
  },
  he: {
    nouvelle_cle: 'טקסט בעברית',
  },
};
```

## 📦 Dépendances Principales

- **next** : Framework React
- **react** : Bibliothèque UI
- **@fortawesome/fontawesome-free** : Icônes
- **@supabase/supabase-js** : Client base de données (futur)

## 🎨 Personnalisation du Design

Le design est contrôlé par `src/app/globals.css` :

- Variables CSS dans `:root`
- Couleur accent : `--accent-color: #d4af37`
- Police : Outfit (Google Fonts)

## 🚧 Roadmap

### Phase Actuelle : Migration Complète ✅

- [x] Structure Next.js
- [x] Pages principales
- [x] Localisation FR/HE
- [x] Design fidèle à l'original

### Prochaines Étapes

- [ ] Interface Admin (CRUD produits)
- [ ] Intégration Supabase
- [ ] Authentification admin
- [ ] Formulaire contact fonctionnel
- [ ] Optimisation SEO avancée
- [ ] Déploiement Vercel

## 📝 Notes Importantes

- **Images** : Les images de produits sont dans `public/images/`
- **Données** : Actuellement en local (`src/data/products.js`)
- **CSS** : Mix de CSS vanilla et Tailwind (priorité au CSS vanilla)

## 🤝 Contribution

Pour contribuer au projet :

1. Créer une branche feature
2. Commiter les changements
3. Pousser vers la branche
4. Créer une Pull Request

## 📄 Licence

Tous droits réservés © 2025 Gad-Doors

---

**Développé avec** ❤️ **par l'équipe Gad-Doors**

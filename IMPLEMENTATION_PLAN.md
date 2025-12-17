# Plan de Refactoring : Nettoyage et Architecture

Ce plan détaille les étapes pour appliquer l'audit CTO, en se concentrant sur le nettoyage du code mort et la restructuration des dossiers.

## 🧹 Phase 1 : Nettoyage Code Mort (Tâche A)

### Suppression de Fichiers
- [DELETE] `src/lib/firebase.js` (Redondant avec `firebaseApp.js`)
- [DELETE] `src/app/api/auth` (Dossier complet - API Legacy)

### Nettoyage Dépendances
- [UNINSTALL] `bcryptjs`

## 🏗️ Phase 2 : Restructuration (Tâche C)

### Création de la Structure Cible
```
src/
├── components/
│   ├── ui/               (Atomiques)
│   ├── layout/           (Structurels)
│   ├── features/         (Business)
│   └── admin/            (Admin existant + nouveaux)
├── services/
│   └── business/         (Logique métier)
└── lib/
    ├── firebase/         (Config Firebase)
    └── utils/            (Helpers)
```

### Plan de Déplacement (Mapping)

#### UI Components -> `src/components/ui/`
- `Badge.js`
- `Spinner.js`
- `Toast.js`
- `LoadingSkeleton.js`
- `Modal.js`
- `FormField.js`

#### Layout Components -> `src/components/layout/`
- `Header.js`
- `Footer.js`
- `ClientLayout.js`
- `PageSection.js`
- `StructuredData.js`
- `src/components/admin/AdminLayout.js` -> REST IN PLACE (already in admin subfolder, maybe keep there or move to layout/admin?) -> *Decision: Keep basic components here, but AdminLayout is specific. User asked to move AdminLayout to `src/components/layout/`.*

#### Feature Components -> `src/components/features/`
- `ProductCard.js`
- `ProductListPage.js`
- `WhatsAppWidget.js`
- `src/components/installations/InstallationGrid.js` -> Move to `features/installations/`? Or just `features/InstallationGrid.js`? *User said: "features/ <-- ProductCard, InstallGrid, WhatsAppWidget"*
- `src/components/home/HomeContent.js` -> Move to `features/home/`?

#### Services -> `src/services/business/`
- `src/lib/productStore.js`
- `src/lib/installationStore.js`
- `src/lib/messageStore.js`

#### Lib -> `src/lib/firebase/`
- `src/lib/firebaseApp.js`

### Mise à jour des Imports
Une fois les fichiers déplacés, une recherche globale et remplacement (ou un script de refactor) sera nécessaire pour mettre à jour les chemins d'import.
Exemple : `import Header from '@/components/Header'` deviendra `import Header from '@/components/layout/Header'`.

## 🛠️ Phase 3 : Refactoring Ciblé (Tâche B)

### `ClientLayout.js` & `src/app/layout.js`
- Déplacer la logique `lang` et `dir` dans `src/app/layout.js` (Root Layout).
- Simplifier `ClientLayout.js` pour ne gérer que le Provider ou le Wrapper nécessaire.

### `WhatsAppWidget.js`
- Créer `src/data/locales/whatsapp.js` (ou similaire).
- Utiliser ce fichier pour les textes.

## ✅ Procédure d'Exécution

1.  **Préparation** : Créer les dossiers manquants.
2.  **Move** : Déplacer les fichiers (Script PowerShell).
3.  **Update Imports** : Corriger les imports dans tout le projet.
4.  **Refactor** : Appliquer les changements sur `ClientLayout` et `WhatsAppWidget`.
5.  **Cleanup** : Supprimer les fichiers morts et dépendances.

# 🏢 CTO Report: Gad Doors Project Audit

**Date:** 17 Décembre 2025
**Version:** 1.0.0
**Status:** Audit & Roadmap

---

## 🏗️ Phase 1: Le Grand Nettoyage (Code Hygiene)

Une base de code saine est la clé de la vélocité. Voici les éléments identifiés comme "Dette Technique" à éliminer immédiatement.

### 🧹 Tableau de Nettoyage

| Fichier / Dossier | Problème Détecté | Solution Recommandée | Gain |
| :--- | :--- | :--- | :--- |
| `src/lib/firebase.js` | **Redondance**. Initialise Firebase de manière identique à `firebaseApp.js`. | **Supprimer**. Utiliser uniquement `firebaseApp.js` partout. | Réduit le bundle, évite double init. |
| `src/app/api/auth/login` | **Code Zombie**. Route API d'authentification serveur (probablement `bcrypt`) alors que le Frontend utilise Firebase Client Auth. | **Supprimer**. | Sécurité (moins de surface d'attaque) & Clarté. |
| `src/components/ClientLayout.js` | **Logique Douteuse**. Utilise un `useEffect` pour set `dir` et `lang` sur `<html>`. | **Refactoriser**. Passer ces props directement depuis le Server Component `layout.js` racine. | Évite le "Flash of Content" (FOUC) et améliore le SSR. |
| `src/components/WhatsAppWidget.js` | **Hardcoded Strings**. Les messages multilingues sont en dur dans le composant. | **Extraire**. Déplacer dans les dictionnaires de traduction (`src/data/locales` ou similaire). | Maintainabilité et séparation Code/Contenu. |
| `bcryptjs` (package.json) | **Dépendance Inutile**. Utilisée uniquement par le Code Zombie ci-dessus. | **Désinstaller**. | Allège `node_modules`. |

---

## 🏛️ Phase 2: Rapport d'Architecture

### Analyse de l'Existant
L'architecture actuelle est **Hybride (Next.js App Router + Firebase Client SDK)**. C'est un choix solide pour la rapidité de développement, mais qui demande de la rigueur sur le SSR (Server Side Rendering).

**Points Forts :**
- ✅ Utilisation de Next.js App Router.
- ✅ Séparation claire `src/app` (pages) et `src/components`.
- ✅ Configuration SEO (`metadata`) présente dans `layout.js`.

**Points Faibles / Risques :**
- ⚠️ **Client Wrapping Global** : `ClientLayout` enveloppe toute l'application. Bien que Next.js gère bien les Server Components imbriqués, cette habitude pousse à tout traiter côté client (Contexts globaux).
- ⚠️ **Mélange "Lib"** : Le dossier `src/lib` contient à la fois de l'init Firebase (`firebaseApp.js`) et de la logique métier (`productStore.js`).
- ⚠️ **Structure à plat** : `src/components` commence à être encombré (`Header`, `Footer`, `Badge`, `Spinner`...).

### Proposition de Restructuration
Séparez la **Vue** (UI) de la **Logique** (Business) et de l'**Infrastructure** (Utils).

```
src/
├── app/                  # Routes (Pages)
├── components/           # UI Components (Dumb components)
│   ├── ui/               # Atomiques (Button, Badge, Spinner)
│   ├── layout/           # Structurels (Header, Footer, Sidebar)
│   ├── features/         # Liés au business (ProductCard, InstallGrid)
│   └── admin/            # Admin spécifique
├── lib/
│   ├── firebase/         # Init & Config Firebase seulement
│   └── utils/            # Helpers purs (formatDate, cn...)
├── services/             # [NOUVEAU] Business Logic (ProductService, AuthService)
│   # Remplacer les "Stores" par des Services plus structurés
└── hooks/                # Custom React Hooks
```

---

## 🚀 Phase 3: L'Innovation (Missing Features Roadmap)

Pour passer de "Site Vitrine" à "Machine de Guerre E-commerce", voici les 3 fonctionnalités manquantes prioritaires.

### 1. Le "Door Visualizer" (Configurateur Visuel)
**Pourquoi ?** Vendre une porte, c'est vendre du design. Le client a peur de se tromper. S'il peut VOIR la porte chez lui (ou au moins configurer couleur/poignée), le taux de conversion explose (+40%).
- **Tech Stack :** Canvas HTML5 ou simple superposition d'images Png transparentes (Porte + Cadre + Poignée).
- **Logique :** Un composant client qui combine des calques d'images en fonction des choix (Sélecteur de couleur -> Change calque 1).

### 2. "Instant Quote" (Devis Intelligent)
**Pourquoi ?** Le bottleneck actuel est l'attente du devis. Un calculateur estimatif capture le lead immédiatement ("Obtenir mon prix maintenant").
- **Tech Stack :** React State Form + Zod (Validation).
- **Logique :** Formulaire étape par étape (Wizard).
    1. Modèle
    2. Quantité
    3. Type de pose
    -> Résultat : "Estimation : 12 000 ₪".
    -> CTA : "Bloquer ce prix avec un expert".

### 3. CRM Bridge (Lead Automation)
**Pourquoi ?** Recevoir un email c'est bien, avoir le lead dans un Pipeline c'est mieux. Ne perdez plus aucun prospect.
- **Tech Stack :** Firebase Cloud Functions (Trigger on Firestore Create).
- **Logique :**
    - Client remplit formulaire contact.
    - Firestore écrit dans collection `messages`.
    - **Cloud Function** déclenche :
        - Envoi notification WhatsApp à l'équipe commerciale (via Twilio/WABA).
        - Ajout du contact dans un Google Sheet "Leads" ou un CRM dédié (HubSpot Free/Pipedrive).

---

## 🏁 Recommandation Immédiate (Action Plan)

Je vous conseille de commencer par la **Phase 1** pour assainir la base avant d'ajouter le **Configurateur**.

**Voulez-vous que je lance le nettoyage maintenant (suppression code mort + fix layout) ?**

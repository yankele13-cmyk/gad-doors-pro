# 🔐 Audit Complet : Section Administrateur "Gad Doors Pro"

**Date :** 17 Décembre 2025
**Auditeur :** Antigravity (Architecte Senior Full-Stack)
**Cible :** `/admin/*`

---

## 📊 Vue d'Ensemble Rapide

| Composant | État | Critique |
| :--- | :--- | :--- |
| Authentification Firebase | ✅ Opérationnel | - |
| Protection des Routes | ✅ Fonctionnel (AuthGuard) | - |
| Gestion des Produits | ✅ Complet (CRUD) | - |
| Gestion des Installations | ✅ Complet (CRUD + Zod) | - |
| Gestion des Messages | ⚠️ Partiellement implémenté | `deleteMessage` ne fonctionne pas |
| Sidebar / Réalisations | ⚠️ Lien manquant | lien non présent dans la navigation |

---

## 🔐 1. Système d'Authentification

### Mécanisme Actuel

```mermaid
flowchart LR
    A["/admin (Login Page)"] --> B{Firebase Auth}
    B -- Succès --> C[Redirect "/admin/dashboard"]
    B -- Échec --> D[Afficher Erreur]
    C --> E{AuthGuard Check}
    E -- User Exists --> F[Afficher Page Admin]
    E -- No User --> G[Redirect "/admin"]
```

### Fichiers Clés

| Fichier | Rôle | Qualité |
| :--- | :--- | :--- |
| `src/context/AuthContext.js` | Fournit `login`, `logout`, `user`, `loading` | ✅ Propre |
| `src/app/admin/layout.js` | Wrappe toutes les pages admin avec `AuthProvider` et `AdminGuard` | ✅ Bon |
| `src/components/admin/AuthGuard.js` | Vérifie si l'utilisateur est connecté, sinon redirige | ✅ Fonctionnel |

### Points Forts
*   **Firebase Authentication** : Utilisation du SDK Firebase pour `signInWithEmailAndPassword`. Sécurité gérée par Google.
*   **Double Protection** : Le `layout.js` de `/admin` wrappe tout avec `AuthProvider` + `AdminGuard`, ET le `AdminLayout.js` (utilisé par les pages internes) a aussi un `AuthGuard`. La protection est redondante (ce qui est bien pour la sécurité, mais ajoute de la complexité).
*   **Gestion des erreurs** : Messages d'erreur personnalisés pour `auth/invalid-credential` et `auth/too-many-requests`.

### ⚠️ Points d'Attention / Risques

| Priorité | Problème | Risque | Recommandation |
| :--- | :--- | :--- | :--- |
| 🟡 MOYEN | **Pas de RBAC (Role-Based Access Control)** | Tout utilisateur Firebase authentifié peut accéder à l'admin. Si un deuxième compte est créé, il aura accès. | Implémenter une vérification du rôle (`admin: true` dans Firestore custom claims ou un champ `role` sur le document utilisateur). |
| 🟢 BASSE | **Double AuthGuard** | Redondance entre `admin/layout.js` > `AdminGuard` et `AdminLayout.js` > `AuthGuard`. | Supprimer le `AuthGuard` de `AdminLayout.js` pour simplifier. Le layout de route est suffisant. |
| 🟢 BASSE | **Pas de "Mot de passe oublié"** | L'utilisateur ne peut pas récupérer son mot de passe depuis la page admin. | Ajouter un lien vers `sendPasswordResetEmail` de Firebase. |

---

## 🧑‍💼 2. Fonctionnalités Administrateur (Pages)

### `/admin/dashboard`

| Fonctionnalité | État | Notes |
| :--- | :--- | :--- |
| Statistiques (Produits, Portes, Accessoires, Messages) | ✅ Fonctionne | Affiche des compteurs dynamiques. |
| Actions Rapides (Liens vers Produits, Messages) | ✅ Fonctionne | - |
| Banière de Bienvenue | ✅ Design soigné | - |
| État du Système | ⚠️ Statique | "Dernière Synchro Google" affiche `-`. Ce n'est pas dynamique. |

---

### `/admin/products`

| Fonctionnalité | État | Notes |
| :--- | :--- | :--- |
| Afficher la liste des produits | ✅ Fonctionne | Via `ProductTable.js` |
| Ajouter un produit (Modal) | ✅ Fonctionne | Via `ProductModal.js` |
| Modifier un produit | ✅ Fonctionne | - |
| Supprimer un produit | ✅ Fonctionne | - |
| Masquer/Afficher un produit | ✅ Fonctionne | `toggleProductVisibility` |
| Upload d'image de produit | ✅ Fonctionne (Firebase Storage) | - |

**Verdict :** Page complète et fonctionnelle. ✅

---

### `/admin/messages`

| Fonctionnalité | État | Notes |
| :--- | :--- | :--- |
| Afficher tous les messages (Leads) | ✅ Fonctionne | Firebase Firestore |
| Filtrer par statut (Tous / Non Lus / Lus) | ✅ Fonctionne | - |
| Rechercher un message | ✅ Fonctionne | - |
| Marquer comme lu | ✅ Fonctionne | - |
| Supprimer un message | ❌ **NE FONCTIONNE PAS** | La fonction `deleteMessage` dans `messageStore.js` est un placeholder : `console.warn('deleteMessage not implemented...')`. Le bouton de suppression ne fait rien de visible. |

> [!CAUTION]
> **Faille Fonctionnelle Critique** : Le bouton "Supprimer" sur la page Messages appelle `handleDelete`, qui appelle `deleteMessage`, mais cette fonction ne supprime rien. L'utilisateur pense supprimer un message alors que ce n'est pas le cas.

**Correction Requise :** Implémenter `deleteDoc` dans `deleteMessage`.

---

### `/admin/installations`

| Fonctionnalité | État | Notes |
| :--- | :--- | :--- |
| Afficher la galerie | ✅ Fonctionne | - |
| Uploader une image | ✅ Fonctionne + Validation Zod | - |
| Supprimer une image | ✅ Fonctionne (Storage + Firestore) | - |

**Verdict :** Page complète et fonctionnelle. ✅

> [!WARNING]
> **Lien Manquant dans la Sidebar** : La page `/admin/installations` existe et fonctionne, mais elle n'est **pas présente dans le menu de navigation** (`AdminSidebar.js`). L'admin doit taper l'URL manuellement pour y accéder.

---

## 🧩 3. Architecture & Composants Admin

### Structure des Fichiers (Actuelle)

```
src/
├── app/admin/
│   ├── layout.js          (Wrappe tout avec Auth)
│   ├── page.js             (Login Page)
│   ├── dashboard/page.js
│   ├── products/page.js
│   ├── messages/page.js
│   └── installations/page.js
├── components/admin/
│   ├── AdminLayout.js      (Header + Sidebar + AuthGuard)
│   ├── AdminSidebar.js     (Navigation)
│   ├── AuthGuard.js        (Protection)
│   ├── ProductTable.js
│   ├── ProductModal.js
│   └── AdminInstallationsClient.js
├── context/
│   ├── AuthContext.js      (Firebase Auth State)
│   ├── AdminContext.js     (Sidebar State)
│   └── AdminUIContext.js   (UI State - potentially unused)
└── lib/
    ├── productStore.js
    ├── installationStore.js
    ├── messageStore.js
    └── validations.js      (Zod Schemas)
```

### Points d'Architecture

| Aspect | État | Notes |
| :--- | :--- | :--- |
| Séparation Page/Composant | ✅ Bonne | Les pages sont légères, la logique est dans les composants. |
| Data Fetching (Dashboard) | 🟡 Client-Side | Le dashboard pourrait être un Server Component pour de meilleures perfs, mais c'est acceptable pour un admin. |
| État Global (Sidebar) | ✅ OK | `AdminContext` gère l'état d'ouverture de la sidebar. |
| Validation (Zod) | ✅ Présent | Utilisé pour l'upload d'installations. Pas encore pour les Produits ou Messages. |

---

## 📋 Récapitulatif des Actions Recommandées

| Priorité | Action | Fichier Cible | Effort |
| :--- | :--- | :--- | :--- |
| 🔴 HAUTE | **Implémenter `deleteMessage`** | `src/lib/messageStore.js` | 5 min |
| 🟡 MOYENNE | **Ajouter le lien "Réalisations" dans la Sidebar** | `src/components/admin/AdminSidebar.js` | 2 min |
| 🟡 MOYENNE | (Optionnel) **Implémenter RBAC** | `AuthContext.js` + Firestore Rules | 30 min |
| 🟢 BASSE | **Supprimer la double protection `AuthGuard`** | `src/components/admin/AdminLayout.js` | 2 min |
| 🟢 BASSE | (Optionnel) **Ajouter "Mot de passe oublié"** | `src/app/admin/page.js` | 15 min |

---

## ✅ Conclusion

La section Admin est **fonctionnelle et bien conçue**. L'authentification Firebase est solide. Les deux bugs majeurs sont :
1.  La suppression des messages qui ne fonctionne pas.
2.  Le lien "Réalisations" absent du menu.

Ces deux points sont des corrections rapides (< 10 minutes de travail).

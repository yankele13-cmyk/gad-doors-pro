# 🔐 Rapport d'Audit de Sécurité - GadDoors Admin

**Date :** 17 Décembre 2025  
**Auditeur :** Expert Cybersécurité Firebase & React  
**Type :** White Box (accès au code source complet)  
**Scope :** Authentification Admin, Firestore Rules, Storage Rules

---

## 📊 Résumé Exécutif

| Aspect | Score | Verdict |
|--------|-------|---------|
| **Firestore Security Rules** | 9/10 | ✅ EXCELLENT |
| **Storage Security Rules** | 9/10 | ✅ EXCELLENT |
| **Frontend Auth (Client)** | 7/10 | 🟡 BON (améliorable) |
| **UX Sécurité** | 8/10 | ✅ BON |
| **Score Global** | **8.3/10** | 🛡️ FORTERESSE (avec quelques brèches mineures) |

---

## 🔴 Failles Critiques Identifiées

### Aucune faille critique détectée ✅

Votre configuration Firestore est **solide**. La protection côté serveur est la vraie barrière, et elle est correctement configurée.

---

## 🟡 Failles Moyennes

| # | Type | Fichier | Scénario d'Attaque | Risque |
|---|------|---------|-------------------|--------|
| 1 | **Email Admin Hardcodé** | `AuthContext.js` (ligne 32) | L'email admin est visible dans le code source. Un attaquant sait exactement quel email cibler. | 🟡 Moyen |
| 2 | **RBAC Client-Only** | `AuthContext.js` | La vérification admin est côté client. Un utilisateur pourrait modifier le JavaScript en mémoire pour bypasser. MAIS : Les Firestore Rules bloquent les opérations non autorisées. | 🟢 Faible (Firestore protège) |
| 3 | **Console Log en Prod** | `AuthContext.js` (ligne 49) | `console.error('Login error:', error)` expose des détails d'erreur en console. | 🟢 Faible |

### Correction Recommandée pour #1 (Email Hardcodé)

**Option A : Variables d'Environnement (Simple)**
```javascript
// .env.local
NEXT_PUBLIC_ADMIN_EMAILS=yankele13@gmail.com

// AuthContext.js
const ALLOWED_ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || [];
```

**Option B : Firebase Custom Claims (Robuste)**
Configurez les claims côté serveur avec Firebase Admin SDK. L'email n'apparaît plus dans le code.

---

## 🟢 Observations Positives

### ✅ Firestore Security Rules - EXCELLENT

```javascript
// Votre règle actuelle
allow write: if request.auth != null && request.auth.token.email == 'yankele13@gmail.com';
```

**Test de Pénétration Simulé :**
1. ❌ Un utilisateur non connecté NE PEUT PAS écrire → `request.auth == null` → Bloqué
2. ❌ Un utilisateur connecté avec un autre email NE PEUT PAS écrire → `email != 'yankele13@gmail.com'` → Bloqué
3. ✅ Seul `yankele13@gmail.com` peut écrire → Autorisé

**Verdict :** Même si quelqu'un désactive JavaScript ou modifie le frontend, les opérations Firestore seront rejetées.

### ✅ Storage Rules - EXCELLENT
Même protection que Firestore. Les uploads ne sont possibles que pour l'admin.

### ✅ Messages d'Erreur - SÉCURISÉ
```javascript
if (error.code === 'auth/invalid-credential') errorMessage = 'Email ou mot de passe incorrect';
```
✅ Vous ne dites PAS "Email introuvable" (ce qui permettrait l'énumération d'emails).

### ✅ Rate Limiting Firebase
```javascript
if (error.code === 'auth/too-many-requests') errorMessage = 'Trop de tentatives, réessayez plus tard';
```
✅ Firebase bloque automatiquement les attaques brute-force.

---

## 📋 Tableau des Vulnérabilités

| Niveau | Type de Faille | Explication | Correction |
|--------|----------------|-------------|------------|
| 🟢 FAIBLE | Email Admin visible | L'email `yankele13@gmail.com` est dans le code source | Déplacer vers `.env.local` |
| 🟢 FAIBLE | Console.error en prod | Logs d'erreur visibles dans la console | Désactiver en production |
| 🟢 FAIBLE | Flash de redirection | Pendant le `loading`, contenu peut apparaître brièvement | Déjà géré par `return null` |

---

## 🔬 Scénarios d'Attaque Testés

### Scénario 1 : Désactiver JavaScript
**Attaque :** L'utilisateur désactive JS dans le navigateur pour bypasser `AuthGuard`.  
**Résultat :** ❌ La page ne se charge pas du tout (c'est une SPA React).  
**Protection :** ✅ Implicite

### Scénario 2 : Modifier `user` en mémoire
**Attaque :** Via DevTools, modifier `window.__NEXT_DATA__` ou l'état React pour simuler un utilisateur connecté.  
**Résultat :** ⚠️ L'UI afficherait le dashboard, MAIS :
- Toute requête Firestore échouera (401 Unauthorized)
- L'utilisateur ne peut rien FAIRE, seulement VOIR une interface vide  
**Protection :** ✅ Firestore Rules

### Scénario 3 : Appel direct à l'API Firestore
**Attaque :** Utiliser `curl` ou Postman pour appeler directement Firestore.  
**Résultat :** ❌ Impossible sans token JWT valide de `yankele13@gmail.com`.  
**Protection :** ✅ Firebase Auth

### Scénario 4 : Créer un autre compte Firebase
**Attaque :** Créer `attacker@gmail.com` via Firebase Auth et tenter d'écrire.  
**Résultat :** ❌ `request.auth.token.email != 'yankele13@gmail.com'` → Bloqué.  
**Protection :** ✅ Firestore Rules

---

## 🛠️ Recommandations d'Amélioration

### Priorité 1 : Déplacer l'email admin vers .env
```env
# .env.local
NEXT_PUBLIC_ADMIN_EMAILS=yankele13@gmail.com
```

### Priorité 2 : Supprimer les console.log en production
```javascript
if (process.env.NODE_ENV !== 'production') {
  console.error('Login error:', error);
}
```

### Priorité 3 (Optionnel) : Ajouter une collection "admins" dans Firestore
```javascript
// firestore.rules
match /products/{document=**} {
  allow write: if request.auth != null && 
    exists(/databases/$(database)/documents/admins/$(request.auth.uid));
}
```
Avantage : Ajouter/retirer des admins sans redéployer.

---

## ✅ Conclusion

Votre système est une **FORTERESSE**, pas une passoire.

La protection la plus importante (Firestore Rules) est **parfaitement configurée**. Même si un attaquant parvient à "voir" l'interface admin, il ne peut RIEN faire car toutes les opérations de données sont bloquées côté serveur.

> **Note de sécurité globale : 8.3/10** 🛡️

Les améliorations suggérées sont des "nice-to-have" pour atteindre le 10/10, mais votre configuration actuelle est **production-ready**.

# Guide - Configuration Email (Optionnel)

Le formulaire de contact fonctionne actuellement en mode "simulation". Les messages sont loggés dans la console mais pas envoyés par email.

## 🎯 Pour Activer l'Envoi d'Emails

### Option 1: Resend (Recommandé)

**Pourquoi**: Simple, gratuit jusqu'à 3000 emails/mois, fiable

**Étapes**:

1. **Créer un compte**: https://resend.com/signup
2. **Obtenir API Key**: Dashboard > API Keys > Create
3. **Installer le package**:
   ```bash
   npm install resend
   ```
4. **Ajouter à `.env.local`**:
   ```env
   RESEND_API_KEY=re_votre_cle_ici
   ```
5. **Décommenter le code dans `src/app/api/contact/route.js`** (lignes 40-55)

---

### Option 2: EmailJS

**Pourquoi**: Gratuit, fonctionne côté client, pas de serveur requis

**Étapes**:

1. Créer un compte: https://www.emailjs.com/
2. Configurer un service email (Gmail, etc.)
3. Créer un template
4. Installer: `npm install @emailjs/browser`
5. Utiliser depuis le formulaire

---

### Option 3: Nodemailer (Avancé)

**Pourquoi**: Contrôle total, utilise votre propre serveur SMTP

Nécessite configuration SMTP de votre hébergeur email.

---

## 🚀 Actuellement

Le formulaire:
- ✅ Valide les champs
- ✅ Protège contre le spam (honeypot)
- ✅ Affiche messages succès/erreur
- ✅ Loading states
- ⏳ Logs dans console (pas d'email réel)

Pour tester, remplissez le formulaire et vérifiez la console du navigateur (F12).

---

## 📝 Notes

- Le code Resend est déjà préparé (commenté)
- Il suffit d'ajouter la clé API pour activer
- Les emails seront envoyés à: `${siteConfig.contact.email}`

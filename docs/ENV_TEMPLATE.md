# ===================================
# VARIABLES D'ENVIRONNEMENT - TEMPLATE
# ===================================
# 
# Copiez ce fichier en `.env.local` et remplissez les valeurs
# NE PAS COMMITER .env.local (déjà dans .gitignore)

# -----------------------------------
# SUPABASE (Futur - Optionnel)
# -----------------------------------
# Obtenez ces valeurs depuis: https://supabase.com/dashboard/project/_/settings/api

# URL de votre projet Supabase
# NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co

# Clé publique anonyme (ANON KEY)
# NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_ici


# -----------------------------------
# EMAIL (Optionnel)
# -----------------------------------
# Pour le formulaire de contact - voir docs/EMAIL_SETUP.md

# Resend API Key (recommandé)
# RESEND_API_KEY=re_votre_cle_ici

# Ou EmailJS
# NEXT_PUBLIC_EMAILJS_SERVICE_ID=votre_service_id
# NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=votre_template_id
# NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=votre_public_key


# -----------------------------------
# NOTES
# -----------------------------------
# - Actuellement, l'app fonctionne avec localStorage (pas besoin de Supabase)
# - Le formulaire contact fonctionne en mode simulation
# - Décommentez les variables quand vous êtes prêt à activer ces services

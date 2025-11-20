/**
 * Supabase Client Configuration
 * 
 * STATUT ACTUEL: Non utilisé - le site fonctionne avec localStorage
 * 
 * Ce fichier sera utilisé lors de la migration vers Supabase pour:
 * - Stockage des produits en base de données PostgreSQL
 * - Authentification admin robuste avec JWT
 * - Upload d'images vers Supabase Storage
 * 
 * Pour activer Supabase:
 * 1. Créer un compte sur https://supabase.com
 * 2. Créer un projet
 * 3. Copier les clés dans .env.local (voir docs/ENV_TEMPLATE.md)
 * 4. Décommenter le code ci-dessous
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Note: L'export null empêche les erreurs si les variables ne sont pas définies
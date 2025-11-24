-- Table: products
-- Stockage des produits (portes et accessoires)

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  name_he TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('doors', 'accessories')),
  image TEXT NOT NULL,
  description TEXT,
  description_he TEXT,
  is_hidden BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_visible ON products(is_hidden);

-- RLS (Row Level Security) - Lecture publique, écriture admin
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Politique: Tout le monde peut lire les produits visibles
CREATE POLICY "Public can read visible products" ON products
  FOR SELECT
  USING (is_hidden = FALSE);

-- Politique: Tout le monde peut lire TOUS les produits (admin inclus)
-- Note: En production, vous voudrez restreindre cela aux admins authentifiés
CREATE POLICY "Anyone can read all products" ON products
  FOR SELECT
  USING (TRUE);

-- Politique: Autoriser les insertions (temporaire pour dev)
CREATE POLICY "Allow insert for all" ON products
  FOR INSERT
  WITH CHECK (TRUE);

-- Politique: Autoriser les mises à jour (temporaire pour dev)
CREATE POLICY "Allow update for all" ON products
  FOR UPDATE
  USING (TRUE);

-- Politique: Autoriser les suppressions (temporaire pour dev)
CREATE POLICY "Allow delete for all" ON products
  FOR DELETE
  USING (TRUE);
  
// Product Store - CRUD operations avec Supabase
// Gestion centralisée des produits via base de données

import { supabase } from './supabase';

// Charger les produits depuis Supabase
export async function getProducts() {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Ajouter un nouveau produit
export async function addProduct(productData) {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .insert([
        {
          name: productData.name,
          name_he: productData.name_he,
          category: productData.category,
          image: productData.image,
          description: productData.description || '',
          description_he: productData.description_he || '',
          is_hidden: false,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Dispatcher un événement pour notifier les composants
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('productsUpdated'));
    }

    return data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
}

// Mettre à jour un produit existant
export async function updateProduct(id, productData) {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const updateData = {
      ...(productData.name && { name: productData.name }),
      ...(productData.name_he && { name_he: productData.name_he }),
      ...(productData.category && { category: productData.category }),
      ...(productData.image && { image: productData.image }),
      ...(productData.description !== undefined && {
        description: productData.description,
      }),
      ...(productData.description_he !== undefined && {
        description_he: productData.description_he,
      }),
      ...(productData.isHidden !== undefined && {
        is_hidden: productData.isHidden,
      }),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Dispatcher un événement pour notifier les composants
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('productsUpdated'));
    }

    return data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

// Supprimer un produit
export async function deleteProduct(id) {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) throw error;

    // Dispatcher un événement pour notifier les composants
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('productsUpdated'));
    }

    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
}

// Toggle visibilité d'un produit
export async function toggleProductVisibility(id) {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    // Récupérer le produit actuel
    const { data: product, error: fetchError } = await supabase
      .from('products')
      .select('is_hidden')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Inverser la visibilité
    const { data, error } = await supabase
      .from('products')
      .update({ is_hidden: !product.is_hidden })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Dispatcher un événement pour notifier les composants
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('productsUpdated'));
    }

    return data;
  } catch (error) {
    console.error('Error toggling product visibility:', error);
    throw error;
  }
}

// Nettoyer les doublons
export async function deduplicateProducts() {
  if (!supabase) return;

  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    const seen = new Set();
    const duplicates = [];

    for (const product of products) {
      // On utilise le nom comme clé unique
      const key = product.name.trim().toLowerCase();
      if (seen.has(key)) {
        duplicates.push(product.id);
      } else {
        seen.add(key);
      }
    }

    if (duplicates.length > 0) {
      console.log(`Found ${duplicates.length} duplicates. Removing...`);
      const { error: deleteError } = await supabase
        .from('products')
        .delete()
        .in('id', duplicates);

      if (deleteError) throw deleteError;
      console.log('Duplicates removed successfully.');
      
      // Dispatch update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('productsUpdated'));
      }
    }
  } catch (error) {
    console.error('Error deduplicating products:', error);
  }
}

// Variable pour éviter l'initialisation concurrente (Race Condition)
let isInitializing = false;

// Initialiser le store avec les données par défaut si la base est vide
export async function initializeStore(defaultProducts) {
  if (isInitializing) return;
  isInitializing = true;

  if (!supabase) {
    console.warn('Supabase not initialized, skipping store initialization');
    isInitializing = false;
    return;
  }

  try {
    const existing = await getProducts();

    if (existing.length === 0 && defaultProducts && defaultProducts.length > 0) {
      // Insérer les produits par défaut
      const productsToInsert = defaultProducts.map((p) => ({
        name: p.name,
        name_he: p.name_he,
        category: p.category,
        image: p.image,
        description: p.description || '',
        description_he: p.description_he || '',
        is_hidden: p.isHidden || false,
      }));

      const { error } = await supabase
        .from('products')
        .insert(productsToInsert);

      if (error) throw error;

      console.log('✅ Store initialized with default products');
    } else if (existing.length > defaultProducts.length * 1.5) {
      // S'il y a beaucoup plus de produits que par défaut, on tente un nettoyage
      // C'est une heuristique simple pour détecter les doublons massifs
      console.log('⚠️ Potential duplicates detected, running cleanup...');
      await deduplicateProducts();
    }
  } catch (error) {
    console.error('Error initializing store:', error);
  } finally {
    isInitializing = false;
  }
}

// Uploader une image dans Supabase Storage
export async function uploadImage(file) {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }
  if (!file) {
    throw new Error('Aucun fichier à uploader');
  }

  try {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const { data, error } = await supabase.storage
      .from('product-images') // Assurez-vous que ce bucket existe
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Retourner le nom du fichier pour le stocker en DB
    return fileName;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

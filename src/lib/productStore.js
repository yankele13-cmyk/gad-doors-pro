// Product Store - CRUD operations avec Supabase
// Gestion centralisée des produits via base de données

import { supabase } from './supabase';

// Charger les produits depuis Supabase
export async function getProducts() {
  if (!supabase) {
    console.error('Supabase client not initialized (getProducts)');
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

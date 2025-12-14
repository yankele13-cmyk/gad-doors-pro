import { getSupabase } from './supabase';

// Charger les produits depuis Supabase
export async function getProducts() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true });
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data || [];
}

// Ajouter un nouveau produit
export async function addProduct(productData) {
  const supabase = getSupabase();
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

  if (error) {
    console.error('Error adding product:', error);
    throw error;
  }
  window.dispatchEvent(new Event('productsUpdated'));
  return data;
}

// Mettre à jour un produit existant
export async function updateProduct(id, productData) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    throw error;
  }
  window.dispatchEvent(new Event('productsUpdated'));
  return data;
}

// Supprimer un produit
export async function deleteProduct(id) {
  const supabase = getSupabase();
  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
  window.dispatchEvent(new Event('productsUpdated'));
  return true;
}

// Toggle visibilité d'un produit
export async function toggleProductVisibility(id, currentState) {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('products')
    .update({ is_hidden: !currentState })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error toggling product visibility:', error);
    throw error;
  }
  window.dispatchEvent(new Event('productsUpdated'));
  return data;
}

// Uploader une image dans Supabase Storage
export async function uploadImage(file) {
  const supabase = getSupabase();
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
  const { data, error } = await supabase.storage
    .from('product-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
  return data;
}


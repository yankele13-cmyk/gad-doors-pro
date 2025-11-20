// Product Store - CRUD operations avec localStorage
// Gestion centralisée des produits

const STORAGE_KEY = 'gadDoorsProducts';

// Charger les produits depuis localStorage ou retourner les données par défaut
export function getProducts() {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing products from localStorage:', e);
      return [];
    }
  }

  // Si pas de données, charger depuis data/products.js
  return [];
}

// Sauvegarder les produits dans localStorage
function saveProducts(products) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));

  // Dispatcher un événement custom pour notifier les autres composants
  window.dispatchEvent(new Event('productsUpdated'));
}

// Ajouter un nouveau produit
export function addProduct(productData) {
  const products = getProducts();

  // Générer un nouvel ID
  const newId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

  const newProduct = {
    id: newId,
    ...productData,
    isHidden: false, // Par défaut visible
  };

  const updatedProducts = [...products, newProduct];
  saveProducts(updatedProducts);

  return newProduct;
}

// Mettre à jour un produit existant
export function updateProduct(id, productData) {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    throw new Error(`Product with id ${id} not found`);
  }

  products[index] = {
    ...products[index],
    ...productData,
  };

  saveProducts(products);
  return products[index];
}

// Supprimer un produit
export function deleteProduct(id) {
  const products = getProducts();
  const filteredProducts = products.filter((p) => p.id !== id);

  if (filteredProducts.length === products.length) {
    throw new Error(`Product with id ${id} not found`);
  }

  saveProducts(filteredProducts);
  return true;
}

// Toggle visibilité d'un produit
export function toggleProductVisibility(id) {
  const products = getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    throw new Error(`Product with id ${id} not found`);
  }

  product.isHidden = !product.isHidden;
  saveProducts(products);

  return product;
}

// Initialiser le store avec les données par défaut si localStorage est vide
export function initializeStore(defaultProducts) {
  const existing = getProducts();
  if (existing.length === 0 && defaultProducts && defaultProducts.length > 0) {
    saveProducts(defaultProducts);
  }
}

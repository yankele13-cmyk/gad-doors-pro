import { db, storage } from './firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

const COLLECTION_NAME = 'products';

// Charger les produits depuis Firebase Firestore
export async function getProducts() {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('id', 'asc'));
    // Note: 'id' field might not exist on all docs automatically in Firestore like SQL auto-increment.
    // If 'id' is just a custom field, this works. If we rely on document ID, we might need to adjust sorting.
    // For now assuming existing data structure compatibility or new data.
    
    const querySnapshot = await getDocs(q);
    const products = querySnapshot.docs.map(doc => ({
      id: doc.id, // Use Firestore Doc ID as the primary ID
      ...doc.data()
    }));
    
    return products;
  } catch (error) {
    console.error('🚨 Error fetching products from Firebase:', error);
    return [];
  }
}

// Ajouter un nouveau produit
export async function addProduct(productData) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      name: productData.name,
      name_he: productData.name_he,
      category: productData.category,
      image: productData.image,
      description: productData.description || '',
      description_he: productData.description_he || '',
      is_hidden: false,
      createdAt: new Date().toISOString(), 
      // Manually handling 'id' for sorting if needed, or rely on createdAt
      // For compatibility with previous code sorting by 'id', we might want to store a number, 
      // but Firestore IDs are strings. Let's stick to standard Firestore pattern.
    });

    // Fetch the new doc to return it
    return { id: docRef.id, ...productData };
  } catch (error) {
    console.error('Error adding product to Firebase:', error);
    throw error;
  } finally {
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('productsUpdated'));
  }
}

// Mettre à jour un produit existant
export async function updateProduct(id, productData) {
  try {
    const productRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(productRef, productData);
    
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('productsUpdated'));
    return { id, ...productData };
  } catch (error) {
    console.error('Error updating product in Firebase:', error);
    throw error;
  }
}

// Supprimer un produit
export async function deleteProduct(id) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('productsUpdated'));
    return true;
  } catch (error) {
    console.error('Error deleting product from Firebase:', error);
    throw error;
  }
}

// Toggle visibilité d'un produit
export async function toggleProductVisibility(id, currentState) {
  try {
    const productRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(productRef, { is_hidden: !currentState });
    
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('productsUpdated'));
    return { id, is_hidden: !currentState };
  } catch (error) {
    console.error('Error toggling product visibility:', error);
    throw error;
  }
}

// Uploader une image dans Firebase Storage
export async function uploadImage(file) {
  try {
    const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const storageRef = ref(storage, `product-images/${fileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return { path: downloadURL }; // Return format compatible with app usage
  } catch (error) {
    console.error('Error uploading image to Firebase:', error);
    throw error;
  }
}


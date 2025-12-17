import { db, storage } from '@/lib/firebase/firebaseApp';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';

const COLLECTION_NAME = 'installations';

// Fetch all installations
export async function getInstallations() {
  try {
    const q = query(
      collection(db, COLLECTION_NAME), 
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.().toISOString() || data.createdAt || null
      };
    });
  } catch (error) {
    console.error('Error fetching installations:', error);
    return [];
  }
}

// Add a new installation image
export async function addInstallation(file, description = '') {
  try {
    // 1. Upload image to Storage
    const storagePath = `installations/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    const snapshot = await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(snapshot.ref);

    // 2. Save metadata to Firestore
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      imageUrl,
      storagePath,
      description,
      createdAt: serverTimestamp()
    });

    return { id: docRef.id, imageUrl, storagePath, description };
  } catch (error) {
    console.error('Error adding installation:', error);
    throw error;
  }
}

// Delete an installation
export async function deleteInstallation(id, storagePath) {
  try {
    // 1. Delete from Firestore
    await deleteDoc(doc(db, COLLECTION_NAME, id));

    // 2. Delete from Storage
    if (storagePath) {
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting installation:', error);
    throw error;
  }
}

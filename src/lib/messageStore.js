import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

const COLLECTION_NAME = 'messages';

export async function getMessages() {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching messages from Firebase:', error);
    return [];
  }
}

export async function addMessage(messageData) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...messageData,
      isRead: false,
      createdAt: new Date().toISOString()
    });
    return { id: docRef.id, ...messageData };
  } catch (error) {
    console.error('Error adding message to Firebase:', error);
    throw error;
  }
}

export async function markMessageAsRead(id) {
  try {
    const messageRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(messageRef, { isRead: true });
    return true;
  } catch (error) {
    console.error('Error marking message as read in Firebase:', error);
    throw error;
  }
}

export async function deleteMessage(id) {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return true;
  } catch (error) {
    console.error('Error deleting message from Firebase:', error);
    throw error;
  }
}

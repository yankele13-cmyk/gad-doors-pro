import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs, 
  getDoc,
  Timestamp,
  orderBy
} from 'firebase/firestore';
import { db } from '@/lib/firebase/firebaseApp';

const APPOINTMENTS_COLLECTION = 'appointments';

/**
 * Créer un nouveau RDV
 * @param {Object} appointmentData 
 */
export const createAppointment = async (appointmentData) => {
  try {
    // Conversion des dates JS en Timestamp Firestore si nécessaire
    const dataToSave = {
      ...appointmentData,
      start: Timestamp.fromDate(new Date(appointmentData.start)),
      end: Timestamp.fromDate(new Date(appointmentData.end)),
      createdAt: Timestamp.now(),
      status: appointmentData.status || 'scheduled',
      // S'assurer que les objets imbriqués existent
      customer: appointmentData.customer || {},
      access: appointmentData.access || {},
      technical: appointmentData.technical || {},
      sales: appointmentData.sales || {}
    };

    const docRef = await addDoc(collection(db, APPOINTMENTS_COLLECTION), dataToSave);
    return { id: docRef.id, ...dataToSave };
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
};

/**
 * Récupérer les RDV (filtrage optionnel par date)
 * @param {Date} startDate (Optional)
 * @param {Date} endDate (Optional)
 */
export const getAppointments = async (startDate, endDate) => {
  try {
    let q = collection(db, APPOINTMENTS_COLLECTION);
    
    // Si on veut filtrer par date (pour la vue mensuelle par exemple)
    // Note: Firestore nécessite un index composite pour range filter + order
    // Pour l'instant on prend tout et on filtre (sauf si trop de data)
    
    // Tri par date de début
    // q = query(q, orderBy('start', 'asc')); 
    // Attention: orderBy peut nécessiter un index si conbiné avec where. 
    // On fait le tri en mémoire pour commencer simple.

    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Conversion inverse Timestamp -> Date pour l'UI
        start: data.start?.toDate ? data.start.toDate() : new Date(data.start),
        end: data.end?.toDate ? data.end.toDate() : new Date(data.end),
      };
    }).sort((a, b) => a.start - b.start);

  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
};

/**
 * Mettre à jour un RDV
 */
export const updateAppointment = async (id, updateData) => {
  try {
    const appointmentRef = doc(db, APPOINTMENTS_COLLECTION, id);
    
    // Gestion des dates si elles sont modifiées
    const dataToUpdate = { ...updateData };
    if (dataToUpdate.start) dataToUpdate.start = Timestamp.fromDate(new Date(dataToUpdate.start));
    if (dataToUpdate.end) dataToUpdate.end = Timestamp.fromDate(new Date(dataToUpdate.end));
    
    dataToUpdate.updatedAt = Timestamp.now();

    await updateDoc(appointmentRef, dataToUpdate);
    return { id, ...dataToUpdate };
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
};

/**
 * Supprimer un RDV
 */
export const deleteAppointment = async (id) => {
  try {
    await deleteDoc(doc(db, APPOINTMENTS_COLLECTION, id));
    return id;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
};

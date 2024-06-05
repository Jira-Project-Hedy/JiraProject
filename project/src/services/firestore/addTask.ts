import { collection, addDoc } from 'firebase/firestore';
import firebase from '@/services/firebase';

const db = firebase.db

const addTask = async (taskData: any, userEmail: string) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      ...taskData,
      userEmail
    });
    return { status: 'success', message: 'Task added successfully', id: docRef.id };
  } catch (error: any) {
    return { status: 'error', message: error.message };
  }
};

export default addTask;

import { collection, getDocs, query, where } from 'firebase/firestore';
import firebase from '@/services/firebase';

const db = firebase.db;

const getTasks = async (userEmail: string) => {
  try {
    const q = query(collection(db, 'tasks'), where('userEmail', '==', userEmail));
    const querySnapshot = await getDocs(q);

    const tasks: { id: string; }[] = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });

    return { status: 'success', tasks };
  } catch (error: any) {
    return { status: 'error', message: error.message };
  }
};

export default getTasks;

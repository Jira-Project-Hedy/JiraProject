"use client";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState} from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "@/services/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  status: 'todo' | 'inProgress' | 'done';
}

interface IDataContext {
  user: User | null;
  tasks: Task[];
  setUser: Dispatch<SetStateAction<User | null>>;
  addTask: (title: string, status: Task['status']) => void;
  editTask: (id: string, title: string) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: Task['status']) => void;
}

interface IDataProviderProps {
  children: JSX.Element[] | JSX.Element | React.ReactNode;
}

const auth = getAuth(firebase.app);

const DataContext = createContext<IDataContext>({
  user: null,
  tasks: [],
  setUser: () => {},
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  moveTask: () => {},
});

export const DataProvider = ({ children }: IDataProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const q = query(collection(firebase.db, 'tasks'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const userTasks: Task[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Task));
        setTasks(userTasks);
      } else {
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addTask = async (title: string, status: Task['status']) => {
    if (user) {
      const newTask = {
        title,
        completed: false,
        status,
        userId: user.uid,
      };
      const docRef = await addDoc(collection(firebase.db, 'tasks'), newTask);
      setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...newTask }]);
    }
  };

  const editTask = async (taskId: string, newTitle: any) => {
    try {
      const taskDoc = doc(firebase.db, 'tasks', taskId);
      await updateDoc(taskDoc, { title: newTitle });
      return { status: 'success', message: 'Task updated successfully' };
    } catch (error: any) {
      return { status: 'error', message: error.message };
    }
  };
  
  const deleteTask = async (taskId: string) => {
    try {
      const taskDoc = doc(firebase.db, 'tasks', taskId);
      await deleteDoc(taskDoc);
      return { status: 'success', message: 'Task deleted successfully' };
    } catch (error: any) {
      return { status: 'error', message: error.message };
    }
  };
  
  const moveTask = async (taskId: string, newStatus: any) => {
    try {
      const taskDoc = doc(firebase.db, 'tasks', taskId);
      await updateDoc(taskDoc, { status: newStatus });
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
  
      return { status: 'success', message: 'Task moved successfully' };
    } catch (error: any) {
      return { status: 'error', message: error.message };
    }
  };
  

  return (
    <DataContext.Provider value={{ user, tasks, setUser, addTask, editTask, deleteTask, moveTask }}>
      {children}
    </DataContext.Provider>
  );
};

export function useDataContext() {
  return useContext(DataContext);
}
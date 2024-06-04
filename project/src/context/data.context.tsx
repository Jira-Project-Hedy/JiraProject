"use client";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState} from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "@/services/firebase";
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

interface Table {
  id: string;
  name: string;
  userId: string;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
  status: 'todo' | 'inProgress' | 'done';
  tableId: string;
}

interface IDataContext {
  user: User | null;
  tables: Table[];
  tasks: Task[];
  setUser: Dispatch<SetStateAction<User | null>>;
  addTable: (name: string) => void;
  addTask: (title: string, status: Task['status'], tableId: string) => void;
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
  tables: [],
  tasks: [],
  setUser: () => {},
  addTable: () => {},
  addTask: () => {},
  editTask: () => {},
  deleteTask: () => {},
  moveTask: () => {},
});

export const DataProvider = ({ children }: IDataProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [tables, setTables] = useState<Table[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Fetch tables
        const tablesQuery = query(collection(firebase.db, 'tables'), where('userId', '==', user.uid));
        const tablesSnapshot = await getDocs(tablesQuery);
        const userTables: Table[] = tablesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Table));
        setTables(userTables);

        // Fetch tasks
        const tasksQuery = query(collection(firebase.db, 'tasks'), where('userId', '==', user.uid));
        const tasksSnapshot = await getDocs(tasksQuery);
        const userTasks: Task[] = tasksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as Task));
        setTasks(userTasks);
      } else {
        setTables([]);
        setTasks([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addTable = async (name: string) => {
    if (user) {
      const newTable = {
        name,
        userId: user.uid,
      };
      const docRef = await addDoc(collection(firebase.db, 'tables'), newTable);
      setTables((prevTables) => [...prevTables, { id: docRef.id, ...newTable }]);
    }
  };

  const addTask = async (title: string, status: Task['status'], tableId: string) => {
    if (user) {
      const newTask = {
        title,
        completed: false,
        status,
        userId: user.uid,
        tableId,
      };
      const docRef = await addDoc(collection(firebase.db, 'tasks'), newTask);
      setTasks((prevTasks) => [...prevTasks, { id: docRef.id, ...newTask }]);
    }
  };

  const editTask = async (taskId: string, newTitle: any) => {
    try {
      const taskDoc = doc(firebase.db, 'tasks', taskId);
      await updateDoc(taskDoc, { title: newTitle });
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === taskId ? { ...task, title: newTitle } : task))
      );
      return { status: 'success', message: 'Task updated successfully' };
    } catch (error: any) {
      return { status: 'error', message: error.message };
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const taskDoc = doc(firebase.db, 'tasks', taskId);
      await deleteDoc(taskDoc);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
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
        prevTasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
      );
      return { status: 'success', message: 'Task moved successfully' };
    } catch (error: any) {
      return { status: 'error', message: error.message };
    }
  };

  return (
    <DataContext.Provider value={{ user, tables, tasks, setUser, addTable, addTask, editTask, deleteTask, moveTask }}>
      {children}
    </DataContext.Provider>
  );
};

export function useDataContext() {
  return useContext(DataContext);
}
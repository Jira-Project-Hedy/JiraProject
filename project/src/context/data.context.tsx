"use client";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState} from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import firebase from "@/services/firebase";

interface IDataContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

interface IDataProvideProps {
  children: JSX.Element[] | JSX.Element | React.ReactNode;
}

const auth = getAuth(firebase);

const DataContext = createContext<IDataContext>({
  user: null,
  setUser: () => {},
});

export const DataProvider = ({ children }: IDataProvideProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Observador
    const unsubscribe = onAuthStateChanged(auth, () => {
      const user = auth.currentUser;
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <DataContext.Provider value={{ user, setUser }}>
      {children}
    </DataContext.Provider>
  );
};

export function useDataContext() {
  return useContext(DataContext);
}
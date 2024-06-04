// src/app/page.tsx
'use client';
import React, { useEffect } from 'react';
import BoardView from './BoardView';
import isAuth from '@/components/isAuth';
import { useDataContext } from '@/context/data.context';

const Page: React.FC = () => {
  const { user, tasks, setUser } = useDataContext();

  useEffect(() => {
    if (user) {
      // tareas adicionales
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-white mb-4">Here you can work on your project</h1>
        <p className="text-center text-white">Manage your tasks efficiently and effectively.</p>
      </header>
      <main className="flex flex-col items-center">
        <BoardView />
      </main>
    </div>
  );
};

export default isAuth(Page);

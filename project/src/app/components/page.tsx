'use client'
// src/pages/page.tsx
import React from 'react';
import BoardView, { Task } from '../components/BoardView';

const Page: React.FC = () => {
  const initialTasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description of Task 1', completed: false, status: 'todo' },
    { id: 2, title: 'Task 2', description: 'Description of Task 2', completed: true, status: 'inProgress' },
    // Agrega más tareas según sea necesario
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4 drop-shadow-lg">Here you can work on your project</h1>
        <p className="text-center text-lg mb-8 drop-shadow-lg">Manage your tasks efficiently and effectively.</p>
      </header>
      <main className="flex flex-wrap justify-center gap-6">
        <BoardView initialTasks={initialTasks} />
      </main>
    </div>
  );
};

export default Page;

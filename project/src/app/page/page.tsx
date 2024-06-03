'use client'
import React from 'react';
import BoardView, { Task } from './BoardView';

const Page: React.FC = () => {
  const tasks: Task[] = [
    { id: 1, title: 'Task 1', completed: false, status: 'todo' },
    { id: 2, title: 'Task 2', completed: true, status: 'inProgress' },
   
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-white mb-4">Here you can work on your project</h1>
        <p className="text-center text-white">Manage your tasks efficiently and effectively.</p>
      </header>
      <main className="flex flex-col items-center">
        <BoardView initialTasks={tasks} />
      </main>
    </div>
  );
};

export default Page;

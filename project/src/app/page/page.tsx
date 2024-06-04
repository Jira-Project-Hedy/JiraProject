'use client'
import React, { useState } from 'react';
import BoardView, { Task } from './BoardView';


const Page: React.FC = () => {
  const [showTables, setShowTables] = useState(false);

  const tasks: Task[] = [
    { id: 1, title: 'Task 1', completed: false, status: 'tasks' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-800 to-black p-6 text-white flex flex-col">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Here you can work on your project</h1>
        <p className="text-center text-white">Please click on the button below.</p>
      </header>
      <main className="flex flex-col items-center flex-grow">
        {!showTables ? (
          <button
            onClick={() => setShowTables(true)}
            className="bg-white text-blue-500 hover:text-white hover:bg-blue-700 font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
          >
            Create a table
          </button>
        ) : (
          <BoardView initialTasks={tasks} />
        )}
      </main>
      
    </div>
  );
};

export default Page;

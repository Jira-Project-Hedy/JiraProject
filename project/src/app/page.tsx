// src/pages/index.tsx
import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg">
        Welcome! Unify your tasks,<br />
        teammates and tools. <br />
      </h1>
      <p className="text-lg mb-8 max-w-lg text-center drop-shadow-lg">
      Keep everything in the same place, even if your team isn't.
      </p>
      <div>
        <Link href="/components">
          <button className="bg-white text-blue-500 hover:text-white hover:bg-blue-700 font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300">
            Go to Work
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import Link from 'next/link';


const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
          How to use this page?
        </h1>
        <p className="text-lg mb-4 max-w-lg text-white drop-shadow-lg">
          Welcome to our task management platform! Here, you can organize your tasks efficiently and effectively, collaborate with your team, and keep track of your progress.
        </p>
        <p className="text-lg mb-4 max-w-lg text-white drop-shadow-lg">
          First click on the button at the end of the text to create a new table.
          Second, you will have three tables with which you can add your tasks. You can edit the text by clicking on it.
          The first "Tasks" contains the pending tasks, the second "In Progress" column contains the tasks that are being carried out and the third and last "Done" column contains the tasks that have already been completed.
          To change columns click on the option points at the top of the task.
        </p>
      </div>
      <div>
        <Link href="/page/table">
          <button className="bg-white text-blue-500 hover:text-white hover:bg-blue-700 font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300">
          Go to Work
          </button>
        </Link>
      </div>
      <br />
    </div>
  );
};

export default HomePage;

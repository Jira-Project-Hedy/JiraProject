
import React, { useState } from 'react';
import TaskList from './TaskList';

export interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  status: 'todo' | 'inProgress' | 'done';
}

interface BoardViewProps {
  initialTasks: Task[];
}

const BoardView: React.FC<BoardViewProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (title: string, description: string, status: Task['status']) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      description,
      completed: false,
      status,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id: number, title: string, description: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title, description } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const moveTask = (id: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {['todo', 'inProgress', 'done'].map(status => (
        <div key={status} className="relative flex-1 min-w-[300px] bg-white p-4 rounded-lg shadow-lg">
          <h2 
            className="text-xl font-bold mb-4 text-center capitalize text-black cursor-pointer"
            contentEditable
            suppressContentEditableWarning
          >
            {status.replace(/([A-Z])/g, ' $1')}
          </h2>
          <TaskList
            tasks={tasks.filter(task => task.status === status)}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
            onToggleTaskCompletion={toggleTaskCompletion}
            onMoveTask={moveTask}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mt-4"
            onClick={() => addTask('New Task', 'Description of new task', status as Task['status'])}
          >
            Add Task
          </button>
        </div>
      ))}
    </div>
  );
};

export default BoardView;

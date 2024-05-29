// src/components/TaskList.tsx
import React from 'react';
import { Task } from './BoardView';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: number, title: string, description: string) => void;
  onDeleteTask: (id: number) => void;
  onToggleTaskCompletion: (id: number) => void;
  onMoveTask: (id: number, newStatus: Task['status']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, onDeleteTask, onToggleTaskCompletion, onMoveTask }) => {
  return (
    <div>
      {tasks.map(task => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
          <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <div className="flex space-x-2 mt-2">
            <button
              className="bg-indigo-500 hover:bg-indigo-700 text-white text-sm py-1 px-2 rounded"
              onClick={() => onToggleTaskCompletion(task.id)}
            >
              {task.completed ? 'Uncomplete' : 'Complete'}
            </button>
            <button
              className="bg-yellow-400 hover:bg-yellow-600 text-white text-sm py-1 px-2 rounded"
              onClick={() => onEditTask(task.id, task.title, task.description)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded"
              onClick={() => onDeleteTask(task.id)}
            >
              Delete
            </button>
            {task.status !== 'todo' && (
              <button
                className="bg-blue-400 hover:bg-blue-600 text-white text-sm py-1 px-2 rounded"
                onClick={() => onMoveTask(task.id, 'todo')}
              >
                Move to Todo
              </button>
            )}
            {task.status !== 'inProgress' && (
              <button
                className="bg-purple-400 hover:bg-purple-600 text-white text-sm py-1 px-2 rounded"
                onClick={() => onMoveTask(task.id, 'inProgress')}
              >
                Move to In Progress
              </button>
            )}
            {task.status !== 'done' && (
              <button
                className="bg-green-400 hover:bg-green-600 text-white text-sm py-1 px-2 rounded"
                onClick={() => onMoveTask(task.id, 'done')}
              >
                Move to Done
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

//src/app/page/TaskList.tsx
import React, { useState } from 'react';
import { Task } from './BoardView';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: number, title: string) => void;
  onDeleteTask: (id: number) => void;
  onMoveTask: (id: number, newStatus: Task['status']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, onDeleteTask, onMoveTask }) => {
  const [showOptions, setShowOptions] = useState<number | null>(null);

  const handleOptionClick = (taskId: number) => {
    setShowOptions(showOptions === taskId ? null : taskId);
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id} className="bg-white p-4 rounded-lg shadow-md mb-4 relative">
          <h3
            className="text-lg font-bold text-black cursor-pointer"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => onEditTask(task.id, e.currentTarget.textContent || '')}
          >
            {task.title}
          </h3>
          <div className="absolute top-2 right-2">
            <button
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => handleOptionClick(task.id)}
            >
              &#x2022;&#x2022;&#x2022;
            </button>
            {showOptions === task.id && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => {
                    onDeleteTask(task.id);
                    setShowOptions(null);
                  }}
                >
                  Delete
                </button>
                {task.status !== 'inProgress' && (
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onMoveTask(task.id, 'inProgress');
                      setShowOptions(null);
                    }}
                  >
                    Move to In Progress
                  </button>
                )}
                {task.status !== 'done' && (
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      onMoveTask(task.id, 'done');
                      setShowOptions(null);
                    }}
                  >
                    Move to Done
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

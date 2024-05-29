// src/components/TaskList.tsx
import React, { useState } from 'react';
import { Task } from './BoardView';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: number, title: string, description: string) => void;
  onDeleteTask: (id: number) => void;
  onToggleTaskCompletion: (id: number) => void;
  onMoveTask: (id: number, newStatus: Task['status']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, onDeleteTask, onToggleTaskCompletion, onMoveTask }) => {
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newDescription, setNewDescription] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<{ [key: number]: boolean }>({});

  const handleEdit = (task: Task) => {
    setEditingTaskId(task.id);
    setNewTitle(task.title);
    setNewDescription(task.description);
  };

  const handleSave = (id: number) => {
    onEditTask(id, newTitle, newDescription);
    setEditingTaskId(null);
  };

  const toggleMenu = (id: number) => {
    setMenuOpen(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4 relative">
          {editingTaskId === task.id ? (
            <div className="flex flex-col">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded mb-2 w-full bg-white text-black"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
              <textarea
                className="border border-gray-300 p-2 rounded mb-2 w-full bg-white text-black"
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
              />
              <button
                className="bg-green-500 hover:bg-green-700 text-white text-sm py-1 px-2 rounded self-end"
                onClick={() => handleSave(task.id)}
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <h3
                className="text-lg font-bold text-white cursor-pointer"
                onClick={() => handleEdit(task)}
              >
                {task.title}
              </h3>
              <p className="text-gray-400">{task.description}</p>
              <div className="absolute top-2 right-2">
                <div className="relative">
                  <button
                    className="text-gray-500 hover:text-gray-300"
                    onClick={() => toggleMenu(task.id)}
                  >
                    ⋮
                  </button>
                  {menuOpen[task.id] && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-md z-10">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-700"
                        onClick={() => {
                          handleEdit(task);
                          toggleMenu(task.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-700"
                        onClick={() => {
                          onToggleTaskCompletion(task.id);
                          toggleMenu(task.id);
                        }}
                      >
                        {task.completed ? 'Uncomplete' : 'Complete'}
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-700"
                        onClick={() => {
                          onDeleteTask(task.id);
                          toggleMenu(task.id);
                        }}
                      >
                        Delete
                      </button>
                      {task.status !== 'todo' && (
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-700"
                          onClick={() => {
                            onMoveTask(task.id, 'todo');
                            toggleMenu(task.id);
                          }}
                        >
                          Move to Todo
                        </button>
                      )}
                      {task.status !== 'inProgress' && (
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-700"
                          onClick={() => {
                            onMoveTask(task.id, 'inProgress');
                            toggleMenu(task.id);
                          }}
                        >
                          Move to In Progress
                        </button>
                      )}
                      {task.status !== 'done' && (
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-700"
                          onClick={() => {
                            onMoveTask(task.id, 'done');
                            toggleMenu(task.id);
                          }}
                        >
                          Move to Done
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;

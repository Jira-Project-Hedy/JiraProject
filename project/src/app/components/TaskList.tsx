// src/components/TaskList.tsx
import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Task } from './BoardView';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: number, title: string) => void;
  onDeleteTask: (id: number) => void;
  onMoveTask: (id: number, newStatus: Task['status']) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, onDeleteTask, onMoveTask }) => {
  const [showOptions, setShowOptions] = useState<number | null>(null);

  return (
    <div>
      {tasks.map((task, index) => (
        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="bg-white p-4 rounded-lg shadow-md mb-4 relative"
            >
              <h3
                className="text-lg font-bold text-black cursor-pointer"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onEditTask(task.id, e.currentTarget.textContent || '')}
                style={{ color: 'black' }}
              >
                {task.title}
              </h3>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowOptions(showOptions === task.id ? null : task.id)}
              >
                &#x22EE;
              </button>
              {showOptions === task.id && (
                <div className="absolute top-8 right-0 bg-white shadow-lg rounded p-2 z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                  {task.status !== 'todo' && (
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => onMoveTask(task.id, 'todo')}
                    >
                      Move to Todo
                    </button>
                  )}
                  {task.status !== 'inProgress' && (
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => onMoveTask(task.id, 'inProgress')}
                    >
                      Move to In Progress
                    </button>
                  )}
                  {task.status !== 'done' && (
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => onMoveTask(task.id, 'done')}
                    >
                      Move to Done
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default TaskList;

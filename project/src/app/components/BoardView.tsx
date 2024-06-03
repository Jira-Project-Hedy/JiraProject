// src/components/BoardView.tsx
import React, { useState } from 'react';
import TaskList from './TaskList';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  status: 'todo' | 'inProgress' | 'done';
}

interface BoardViewProps {
  initialTasks: Task[];
}

const BoardView: React.FC<BoardViewProps> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = (title: string, status: Task['status']) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title,
      completed: false,
      status,
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id: number, title: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, title } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const moveTask = (id: number, newStatus: Task['status']) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
      const updatedTasks = Array.from(tasks);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      movedTask.status = destination.droppableId as Task['status'];
      updatedTasks.splice(destination.index, 0, movedTask);

      setTasks(updatedTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {['todo', 'inProgress', 'done'].map(status => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="relative flex-1 min-w-[300px] bg-white p-4 rounded-lg shadow-lg"
              >
                <h2
                  className="text-xl font-bold mb-4 text-center capitalize text-black cursor-pointer"
                  contentEditable
                  suppressContentEditableWarning
                  style={{ color: 'black' }}
                >
                  {status.replace(/([A-Z])/g, ' $1')}
                </h2>
                <TaskList
                  tasks={tasks.filter(task => task.status === status)}
                  onEditTask={editTask}
                  onDeleteTask={deleteTask}
                  onMoveTask={moveTask}
                />
                {provided.placeholder}
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mt-4"
                  onClick={() => addTask('New Task', status as Task['status'])}
                >
                  Add Task
                </button>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardView;

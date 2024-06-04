import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import TaskList from './TaskList';
import { useDataContext } from '@/context/data.context';

const BoardView: React.FC = () => {
  const { tasks, addTask, editTask, deleteTask, moveTask } = useDataContext();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId || source.index !== destination.index) {
      moveTask(result.draggableId, destination.droppableId as Task['status']);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {['todo', 'inProgress', 'done'].map((status) => (
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
                  tasks={tasks.filter((task) => task.status === status)}
                />
                {provided.placeholder}
                {status === 'todo' && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full mt-4"
                    onClick={() => addTask('New Task', 'todo')}
                  >
                    Add Task
                  </button>
                )}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default BoardView;
'use client';
import React, { useState, useEffect } from 'react';
import BoardView from '../../TaskView';
import { useDataContext } from '@/context/data.context';
import { useParams, useRouter } from 'next/navigation';
import isAuth from '@/components/isAuth';

const TablePage: React.FC = () => {
  const { tables, editTable, deleteTable } = useDataContext();
  const params = useParams();
  const router = useRouter();

  const tableId = params?.tableId;
  const [isEditing, setIsEditing] = useState(false);
  const [newTableName, setNewTableName] = useState('');

  useEffect(() => {
    console.log('Table ID:', tableId);
  }, [tableId]);

  const currentTable = tables.find((table) => table.id === tableId);

  if (!currentTable) return <div>Table not found</div>;

  const handleEdit = async () => {
    if (newTableName.trim() !== '') {
      await editTable(currentTable.id, newTableName.trim());
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    await deleteTable(currentTable.id);
    router.push('/page/table');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-white mb-4">
          {isEditing ? (
            <input
              type="text"
              value={newTableName}
              onChange={(e) => setNewTableName(e.target.value)}
              onBlur={handleEdit}
              className="p-2 rounded"
            />
          ) : (
            <>
              Table: {currentTable.name}
              <button
                className="ml-4 text-sm text-yellow-500 hover:text-yellow-700"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </>
          )}
        </h1>
        <p className="text-center text-white">Manage your tasks efficiently and effectively.</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-4"
          onClick={handleDelete}
        >
          Delete Table
        </button>
      </header>
      <main className="flex flex-col items-center">
        <BoardView tableId={tableId as string} />
      </main>
    </div>
  );
};

export default isAuth(TablePage);

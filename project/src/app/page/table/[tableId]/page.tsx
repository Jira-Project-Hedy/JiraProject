'use client';
import React, { useEffect } from 'react';
import BoardView from '../../BoardView';
import { useDataContext } from '@/context/data.context';
import { useParams, usePathname } from 'next/navigation';

const TablePage: React.FC = () => {
  const { tables } = useDataContext();
  const params = useParams();
  const pathname = usePathname();

  const tableId = params?.tableId;

  useEffect(() => {
    console.log('Table ID:', tableId);
    console.log('Current Pathname:', pathname);
  }, [tableId, pathname]);

  const currentTable = tables.find((table) => table.id === tableId);

  if (!currentTable) return <div>Table not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-center text-white mb-4">Table: {currentTable.name}</h1>
        <p className="text-center text-white">Manage your tasks efficiently and effectively.</p>
      </header>
      <main className="flex flex-col items-center">
        <BoardView tableId={tableId as string} />
      </main>
    </div>
  );
};

export default TablePage;

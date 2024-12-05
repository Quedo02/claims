import React from 'react';
import { topic } from '../../types';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  RowData,
} from '@tanstack/react-table';

// Sample data interface




const TopicsTable: React.FC<{ data: topic[];}> = ({
  data
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  
  // Define the table columns
  const columns = React.useMemo<ColumnDef<topic>[]>(
    () => [
      {
        accessorKey: 'id_topic',
        header: 'id',

      },
      {
        accessorKey: 'topic',
        header: 'topic',
      },
      {
        accessorKey: 'points',
        header: 'points',
      },
      
    ],
    []
  );

  // Create the table instance
  const table = useReactTable({
    columns,
    data,
    
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <h1 className="text-lg font-semibold mb-4">Topics</h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan} className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <>
                  <div
                    className={
                      header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' ↑',
                      desc: ' ↓',
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                      </>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-4 px-6 text-sm text-gray-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TopicsTable;

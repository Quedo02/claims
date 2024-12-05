import React ,{useState} from 'react';
import Filter from './Filter';
import { claim } from '../../types';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  RowData,
  Column,
  getFacetedUniqueValues,
  FilterFn,
  Row, 
} from '@tanstack/react-table';
import { FaFilter } from 'react-icons/fa';


declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text'| 'select'| 'date'| 'selectNumber'; 
  }
}

const dateRangeFilterFn: FilterFn<any> =(row: Row<any>, columnId: string, filterValue: [string,string]) => {
  const rowValue = row.getValue<Date>(columnId);
  console.log(filterValue)
  // Ensure both filter start and end dates exist
  if (!filterValue[0] || !filterValue[1]) {
    return true; // No filter applied
  }

  const startDate = new Date(filterValue[0]);
  const endDate = new Date(filterValue[1]);
  const rowDate = new Date(rowValue);

  // Return true if the row date is within the filter range
  return rowDate >= startDate && rowDate <= endDate;
};


const DataTable: React.FC<{ data: claim[]; togglePopup: (row: claim) => void }> = ({
  data,
  togglePopup,
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Define the table columns
  const columns = React.useMemo<ColumnDef<claim>[]>(
    () => [
      {
        accessorKey: 'ID',
        header: 'ID',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'Affected',
        header: 'Affected',
        meta:{
          filterVariant:'select',
        }
      },
      {
        accessorKey: 'Topic',
        header: 'Topic',
        meta:{
          filterVariant: 'select'
        }
      },
      {
        accessorKey: 'Points',
        header: 'Points',
      },
      {
        accessorKey: 'Description',
        header: 'Description',
        meta:{
          filterVariant: 'text'
        }
      },
      {
        accessorKey: 'Date',
        header: 'Date',
        cell: ({ getValue }) => {
          const value = getValue() as string;
          return new Date(value).toDateString();
        },
        filterFn: dateRangeFilterFn,
        meta:{
          filterVariant: "date",
        },
      },
      {
        accessorKey: 'Week',
        header: 'Week',
      },
      {
        accessorKey: 'Ticket',
        header: 'Ticket',
      },
      {
        accessorKey: 'Status',
        header: 'Status',
        cell: ({getValue}) => {
          const value =getValue() as number;
          const claimStatusMap:{[key:number]:string} = {
              0: 'New claim',
              1: 'Valid claim',
              2: 'Invalid claim',
              3: 'Refute claim',
              4: 'Request help',
              5: 'Pending for assign'
          };
          return claimStatusMap[value] || 'Unknown status';
      },
      filterFn:'weakEquals',
        meta:{
          filterVariant:'selectNumber',
        }
        
      },
      {
        accessorKey: 'Options',
        header: 'Options',
        cell: ({ row }) => (
          <button
            onClick={() => togglePopup(row.original)}
            className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Vote
          </button>
        ),
      },
    ],
    [togglePopup]
  );




  // Create the table instance
  const table = useReactTable({
    columns,
    data,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    onSortingChange: setSorting,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
    },
  });
  console.log(columnFilters)

  return (
    <div className="p-2">
      <div className="h-2" />
      <div className='flex justify-end'>
<button className=' py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
  onClick={()=>setShowFilters(!showFilters)}
>
  <FaFilter/>
</button>
      </div>
      <div className='w-full p-3 flex justify-between items-center'>
  {showFilters&&['Status', 'Affected', 'Topic', 'Date'].map((col) => (
    <div key={col} className="flex flex-col items-center">
      <label htmlFor={col} className="mb-1 font-semibold">{col}</label>
      {table.getColumn(col) && (
        <Filter column={table.getColumn(col) as Column<claim, unknown>} />
      )}
    </div>
  ))}
</div>
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
                  {header.column.id==='Description' ? (
                          <div>
                            <Filter column={header.column} />
                          </div>
                        ) : null}
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
export default DataTable;

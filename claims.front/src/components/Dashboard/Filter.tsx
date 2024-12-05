import React from 'react';
import { Column } from '@tanstack/react-table';
import DebouncedInput from './DebouncedInput';
import { claim } from '../../types';


function Filter({ column }: { column: Column<claim, unknown> }) {
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  // Handle different filter types
  switch (filterVariant) {
    case 'text':
      return (
        <DebouncedInput
          className="w-36 border shadow rounded"
          onChange={(value) => column.setFilterValue(value)}
          placeholder={`Search ${column.columnDef.header}`}
          value={(columnFilterValue ?? '') as string}
          type="text"
        />
      );

    case 'select':
      // Define the select filter options (you can customize based on your column needs)
      const selectOptions =Array.from(column.getFacetedUniqueValues().keys());
      return (
        <select
          className="w-36 border shadow rounded"
          onChange={(e) => column.setFilterValue(e.target.value)}
          value={(columnFilterValue ?? '')as string}
        >
          <option value="">All</option>
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );

      case 'selectNumber':
        // Use keys() to get the unique filter values
        const selectNumbers = Array.from(column.getFacetedUniqueValues().keys());
      
        return (
          <select
            className="w-36 border shadow rounded"
            value = {columnFilterValue as number}
            onChange={e => column.setFilterValue(e.target.value)}
          >
            <option value="">All</option>
            <option value="0">New claim</option>
            <option value="1">Valid claim</option>
            <option value="2">Invalid claim</option>
            <option value="3">Refute claim</option>
            <option value="4">Request help</option>
            <option value="5">Pending for assign</option>
          </select>
        );
      
      
      

    case 'date':
      return (
        <>
  <label className="flex items-center space-x-4">
    <span className="w-20">Start Date:</span>
    <DebouncedInput
      type="date"
      value={(columnFilterValue as [string, string])?.[0] ?? ''}
      onChange={(value) =>
        column.setFilterValue((old: [string, string]) => [value, old?.[1]])
      }
      placeholder="Start Date"
      className="w-36 border shadow rounded"
    />
  </label>
  <label className="flex items-center space-x-4 mt-2">
    <span className="w-20">End Date:</span>
    <DebouncedInput
      type="date"
      value={(columnFilterValue as [string, string])?.[1] ?? ''}
      onChange={(value) =>
        column.setFilterValue((old: [string, string]) => [old?.[0], value])
      }
      placeholder="End Date"
      className="w-36 border shadow rounded"
    />
  </label>
</>
      );

    default:
      // If no filterVariant is defined or if it's an unsupported variant, return null
      return null;
  }
}

export default Filter;

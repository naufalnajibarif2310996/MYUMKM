import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const Table = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-700 ${className}`}>
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ children, className = '' }) => {
  return (
    <thead className={`bg-gray-50 dark:bg-gray-800 ${className}`}>
      {children}
    </thead>
  );
};

const TableBody = ({ children, className = '' }) => {
  return (
    <tbody className={`bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700 ${className}`}>
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className = '', onClick }) => {
  return (
    <tr 
      className={`table-row ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

const TableHead = ({ 
  children, 
  sortable = false, 
  sortDirection = null, 
  onSort,
  className = '' 
}) => {
  return (
    <th 
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700' : ''} ${className}`}
      onClick={sortable ? onSort : undefined}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortable && (
          <div className="flex flex-col">
            <ChevronUp 
              className={`w-3 h-3 ${sortDirection === 'asc' ? 'text-primary-600' : 'text-gray-400'}`} 
            />
            <ChevronDown 
              className={`w-3 h-3 -mt-1 ${sortDirection === 'desc' ? 'text-primary-600' : 'text-gray-400'}`} 
            />
          </div>
        )}
      </div>
    </th>
  );
};

const TableCell = ({ children, className = '' }) => {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 ${className}`}>
      {children}
    </td>
  );
};

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;

export default Table;
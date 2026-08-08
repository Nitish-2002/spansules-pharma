import React from 'react';

interface Column {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  emptyMessage?: string;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
}

export default function DataTable({ columns, data, emptyMessage = 'No data available', headerClassName, headerStyle }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className={headerClassName || 'bg-gray-50/50 text-gray-500 text-xs font-bold uppercase border-b border-gray-100'} style={headerStyle}>
            {columns.map((col) => (
              <th key={col.key} className={`px-6 py-4 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100/50">
          {data.map((row, rowIdx) => (
            <tr key={row.id || rowIdx} className="hover:bg-white/40 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={`px-6 py-4.5 ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : ''}`}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center py-12 text-gray-400 font-medium">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

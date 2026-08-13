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
  const align = (col: Column) =>
    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : '';

  // Rendered outside the table so the `min-w-max` below cannot force an empty
  // list to scroll sideways just to fit one sentence.
  if (data.length === 0) {
    return (
      <div className="text-center py-10 sm:py-12 px-4 text-gray-400 font-medium text-sm">
        {emptyMessage}
      </div>
    );
  }

  return (
    // `min-w-0` lets this shrink inside flex/grid parents so the table scrolls
    // here instead of widening the page; `min-w-max` keeps columns legible.
    <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain">
      <table className="w-full min-w-max text-left border-collapse text-sm">
        <thead>
          <tr className={headerClassName || 'bg-gray-50/50 text-gray-500 text-xs font-bold uppercase border-b border-gray-100'} style={headerStyle}>
            {columns.map((col) => (
              <th key={col.key} className={`px-4 sm:px-6 py-3.5 sm:py-4 whitespace-nowrap ${align(col)}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100/50">
          {data.map((row, rowIdx) => (
            <tr key={row.id || rowIdx} className="hover:bg-white/40 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className={`px-4 sm:px-6 py-3.5 sm:py-4.5 ${align(col)}`}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import React from 'react';
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

type TUser = {
  name: string;
  email: string;
  phone: string;
};

interface ITableProps {
  columns: ColumnDef<TUser>[];
  data: TUser[];
}
export default function Table({ columns, data }: ITableProps) {
  const table = useReactTable({ columns, data, getCoreRowModel: getCoreRowModel() });
  const headerGroups = table.getHeaderGroups();
  const { rows } = table.getRowModel();

  return (
    <table>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

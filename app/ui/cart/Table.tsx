import React from 'react';
import { ColumnDef, useReactTable, getCoreRowModel } from '@tanstack/react-table';

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

  console.log(table.getHeaderGroups());

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, idx) => (
            <th key={idx}>{column.id}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(({ name, email, phone }) => (
          <tr key={name + email + phone}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


import React from 'react';
import { Table } from 'react-bootstrap';
import { AdminType } from '@/app/admin/types';
import { AdminButtonDetail } from '@/app/admin/components/button';
import AdminEdit from './edit';
import { capitalize } from '../functions/tools';
import { M } from '@/app/admin/modules';



type AdminTableProps = {
   columns: Array<{ name: string }>;
   children: React.ReactNode;
};

type AdminTableRowProps = {
   data: any;
   admin: AdminType;
   children: React.ReactNode;
};

type AdminTableColumnProps = {
   children: React.ReactNode;
};

export const AdminTable: React.FC<AdminTableProps> = ({ columns, children }) => {
   return (
      <>
         <Table className='table mb-5' hover>
            <thead>
               <tr>
                  {columns.map((column, index) => (
                     <th key={index} className='bg-dark text-white'>{column.name}</th>
                  ))}
                  <th className='bg-dark text-white'></th>
               </tr>
            </thead>
            <tbody>
               {children}
            </tbody>
         </Table>
      </>
   );
};

export const AdminTableRow: React.FC<AdminTableRowProps> = ({ data: object, admin, children }) => {

   admin.unique = object['id'];

   return (
      <>
         <tr>
            {children}
            <td className='text-end'>
               <AdminButtonDetail admin={admin} />
            </td>
         </tr>
      </>
   );
};

export const AdminTableColumn: React.FC<AdminTableColumnProps> = ({ children }) => {
   return (
      <>
         <td>
            {children}
         </td>
      </>
   );
};

// AdminTable.Column = AdminTableColumn;
// AdminTable.Row = AdminTableRow;

//export default AdminTable;

import React from 'react';
import { Table } from 'react-bootstrap';
import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';
import objectX from '@/app/framework/objectx';



type ViktorTableProps = {
   columns: Array<{ name: string }>;
   children: React.ReactNode;
};

type ViktorTableRowProps = {
   data: objectX;
   viktor: ViktorType;
   children: React.ReactNode;
};

type ViktorTableColumnProps = {
   index: number;
   children: React.ReactNode;
};

interface ViktorTableType extends React.FC<ViktorTableProps> {
   Column: React.FC<ViktorTableColumnProps>;
   Row: React.FC<ViktorTableRowProps>;
};

const ViktorTable: ViktorTableType = ({ columns, children }) => {
   return (
      <>
         <Table className='table' hover>
            <thead>
               <tr>
                  <th className='bg-dark text-white'>#</th>
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

const ViktorTableRow: React.FC<ViktorTableRowProps> = ({ data: object, viktor, children }) => {

   viktor.unique = object.unique;

   return (
      <>
         <tr key={object.id}>
            <td>
               {object.id}
            </td>
            {children}
            <td className='text-end'>
               <V.Button.Detail viktor={viktor} />
            </td>
         </tr>
      </>
   );
};

const ViktorTableColumn: React.FC<ViktorTableColumnProps> = ({ index, children }) => {
   return (
      <>
         <td key={index}>
            {children}
         </td>
      </>
   );
};

ViktorTable.Column = ViktorTableColumn;
ViktorTable.Row = ViktorTableRow;

export default ViktorTable;

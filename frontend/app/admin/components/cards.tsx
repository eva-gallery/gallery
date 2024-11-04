'use client'

import React from 'react';
import { Button, Card, Table } from 'react-bootstrap';

import { AdminType } from '@/app/admin/types';
import AdminImage from './image';



type AdminTableProps = {
   columns: Array<{ name: string }>;
   children: React.ReactNode;
};

type AdminTableRowProps = {
   data: any;
   admin: AdminType;
};

type AdminTableColumnProps = {
   children: React.ReactNode;
};

export const AdminCards: React.FC<AdminTableProps> = ({ children }) => {
   return (
      <>
         <div className='row'>
            {children}
         </div>
      </>
   );
};

export const AdminCard: React.FC<AdminTableRowProps> = ({ data: object, admin }) => {

   admin.unique = object['id'];

   return (
      <>
         <Card className='mb-3 h-100 shadow'>
            <Card.Header className=''>
               {object['name']}
            </Card.Header>

            <Card.Body>
               <AdminImage src={`artwork/${object['id']}/thumbnail`} alt={object['name']} type="thumbnail" className="img-fluid" />
            </Card.Body>

            <Card.Footer>
               {object['nft'] ? (
                  <>
                     <Button variant="success" className='me-2'>Minted</Button>
                     <Button variant="primary" className='me-2'>Detail</Button>
                  </>
               ) : (
                  <Button variant="danger" className='me-2'>Mint NFT</Button>
               )}
            </Card.Footer>
         </Card >

      </>
   );
};


// AdminTable.Column = AdminTableColumn;
// AdminTable.Row = AdminTableRow;

//export default AdminTable;

'use server'

import React from 'react';

import { ModuleTable } from '../../types';
import { AdminTable, AdminTableColumn, AdminTableRow } from '../../components/table';
import { AdminBoolean, AdminFlag, AdminLinkIcon } from '../../components/components';



const Table: React.FC<ModuleTable> = ({ admin, data }) => {

   const columns = [
      { name: "Name" },
      { name: "City" },
      { name: "Country" },
      { name: "Public" }
   ];

   return (
      <>
         <AdminTable columns={columns}>
            {data.map((object: any) => (
               <AdminTableRow data={object} admin={admin} key={object['id']}>
                  <AdminTableColumn>
                     <strong>
                        <AdminLinkIcon admin={{ modul: "gallery", action: "detail", unique: object['id'] }}>
                           {object['name']}
                        </AdminLinkIcon>
                     </strong>
                  </AdminTableColumn>

                  <AdminTableColumn>
                     {object['address']}
                  </AdminTableColumn>

                  <AdminTableColumn>
                     <AdminFlag code={object['country']['code']} />
                     {object['country']['name']}
                  </AdminTableColumn>

                  <AdminTableColumn>
                     <AdminBoolean value={object['public']} />
                  </AdminTableColumn>
               </AdminTableRow>
            ))}
         </AdminTable>
      </>
   );
};


export default Table;
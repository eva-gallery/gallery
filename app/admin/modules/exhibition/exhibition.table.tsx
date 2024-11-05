'use server'

import React from 'react';

import { ModuleTable } from '../../types';
import { AdminTable, AdminTableColumn, AdminTableRow } from '../../components/table';
import { AdminBoolean, AdminDate, AdminIcon, AdminLink, AdminLinkIcon } from '../../components/components';



const Table: React.FC<ModuleTable> = ({ admin, data }) => {

   const columns = [
      { name: "Name" },
      { name: "Gallery" },
      { name: "Date" },
      { name: "Curator" },
      { name: "Public" }
   ];

   return (
      <AdminTable columns={columns}>
         {data.map((object: any, index: any) => (
            <AdminTableRow data={object} admin={admin} key={index}>

               <AdminTableColumn>
                  <strong>
                     <AdminLinkIcon admin={{ modul: "exhibition", action: "detail", unique: object['id'] }}>
                        {object['name']}
                     </AdminLinkIcon>
                  </strong>
               </AdminTableColumn>

               <AdminTableColumn>
                  <AdminLink admin={{ modul: "gallery", action: "detail", unique: object['gallery']['id'] }}>
                     {object['gallery']['name']}
                  </AdminLink>
               </AdminTableColumn>

               <AdminTableColumn>
                  <AdminIcon name="date" size={24} className='me-2' />
                  <AdminDate date={object['fromDate']} />  ~ <AdminDate date={object['toDate']} />
               </AdminTableColumn>

               <AdminTableColumn>
                  {object['curator']}
               </AdminTableColumn>

               <AdminTableColumn>
                  <AdminBoolean value={object['public']} />
               </AdminTableColumn>
            </AdminTableRow>
         ))}
      </AdminTable>
   );
};


export default Table;
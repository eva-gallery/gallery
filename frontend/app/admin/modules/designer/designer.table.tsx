import React from 'react';
import { ModuleTable } from '../../types';
import { AdminTable, AdminTableColumn, AdminTableRow } from '../../components/table';
import { AdminLinkIcon } from '../../components/components';




const Table: React.FC<ModuleTable> = ({ admin, data }) => {

   const columns = [
      { name: "Name" },
      { name: "Exhibition" }
   ];

   return (
      <>
         <AdminTable columns={columns}>
            {data.map((object: any, index: any) => (
               <AdminTableRow data={object} admin={admin} key={index}>

                  <AdminTableColumn>
                     <strong>
                        <AdminLinkIcon admin={{ modul: "designer", action: "detail", unique: object['id'] }}>
                           {object['name']}
                        </AdminLinkIcon>
                     </strong>
                  </AdminTableColumn>

                  <AdminTableColumn>
                     <AdminLinkIcon admin={{ modul: "exhibition", action: "detail", unique: object['exhibition']['id'] }}>
                        {object['exhibition']['name']}
                     </AdminLinkIcon>
                  </AdminTableColumn>

               </AdminTableRow>
            ))}
         </AdminTable>

      </>
   );
};


export default Table;
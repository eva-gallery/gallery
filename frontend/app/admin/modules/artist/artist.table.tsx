import React from 'react';

import { AdminTable, AdminTableColumn, AdminTableRow } from '../../components/table';
import { AdminBoolean, AdminFlag, AdminLinkIcon } from '../../components/components';
import { ModuleTable } from '../../types';



const Table: React.FC<ModuleTable> = ({ admin, data }) => {

   const columns = [
      { name: "Name" },
      { name: "Category" },
      { name: "Country" },
      { name: "Public" }
   ];

   return (
      <AdminTable columns={columns}>

         {data.map((object: any) => (
            <AdminTableRow data={object} admin={admin} key={object["id"]}>

               <AdminTableColumn>
                  <strong>
                     <AdminLinkIcon admin={{ modul: "artist", action: "detail", unique: object['id'] }}>
                        {object["name"]}
                     </AdminLinkIcon>

                  </strong>
               </AdminTableColumn>

               <AdminTableColumn>
                  {object["artistCategory"]["name"]}
               </AdminTableColumn>

               <AdminTableColumn>
                  <AdminFlag code={object['country']['code']} />
                  {object["country"]["name"]}
               </AdminTableColumn>

               <AdminTableColumn>
                  <AdminBoolean value={object["public"]} />
               </AdminTableColumn>

            </AdminTableRow>
         ))}

      </AdminTable>
   );
};


export default Table;
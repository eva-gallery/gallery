import React from 'react';
import { ModuleTable } from '../../types';
import { AdminTable, AdminTableColumn, AdminTableRow } from '../../components/table';
import { AdminBoolean, AdminLinkIcon } from '../../components/components';
import AdminImage from '../../components/image';



const Table: React.FC<ModuleTable> = ({ admin, data }) => {

   const columns = [
      { name: "Name" },
      { name: "Year" },
      { name: "Artist" },
      { name: "Image" },
      { name: "NFT" },
      { name: "AI" },
      { name: "Public" }
   ];

   return (
      <AdminTable columns={columns}>

         {data.map((object: any) => (

            <AdminTableRow data={object} admin={admin} key={object['id']}>

               <AdminTableColumn>
                  <strong>
                     <AdminLinkIcon admin={{ modul: "artwork", action: "detail", unique: object['id'] }}>
                        {object['name']}
                     </AdminLinkIcon>
                  </strong>
               </AdminTableColumn>

               <AdminTableColumn>
                  {object['year']}
               </AdminTableColumn>

               <AdminTableColumn>
                  <AdminLinkIcon admin={{ modul: "artist", action: "detail", unique: object['artist']['id'] }}>
                     {object['artist']['name']}
                  </AdminLinkIcon>
               </AdminTableColumn>

               <AdminTableColumn>
                  <AdminImage src={`artwork/${object['id']}/thumbnail`} alt={object['name']} width={100} height="auto" type="thumbnail" />
               </AdminTableColumn>



               <AdminTableColumn>
                  {object['nft'] ? <span className='badge bg-dark'>NFT</span> : null}

               </AdminTableColumn>

               <AdminTableColumn>
                  {object['ai'] ? <span className='badge bg-dark'>AI</span> : null}
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
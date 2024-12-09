import React from 'react';
import { ModuleTable } from '../../types';
import { AdminTable, AdminTableColumn, AdminTableRow } from '../../components/table';
import { AdminIcon, AdminLinkIcon } from '../../components/components';
import AdminImage, { AdminAudio } from '../../components/image';
import AdminEdit from '../../components/edit';
import { FormularResources } from './designer.formular';
import AdminInsert from '../../components/insert';




const Resource: React.FC<ModuleTable> = ({ admin, data }) => {

   const columns = [
      { name: "Name" },
      { name: "Type" },
      { name: "Preview" }

   ];

   return (
      <>
         <h2 className='text-center mb-3'>
            <AdminIcon name="resource" size={48} className='me-3' />
            Environment resources
         </h2>

         <AdminTable columns={columns}>
            {data.map((object: any, index: number) => (
               <tr key={index}>

                  <td>
                     {
                        object['mimeType'] === 'audio/mpeg' ? (
                           <AdminIcon name='audio' size={24} className='me-2' />
                        ) : object['mimeType'] === 'image/jpeg' ? (
                           <AdminIcon name='artwork' size={24} className='me-2' />
                        ) : null
                     }
                     <strong>
                        {object['name']}
                     </strong>
                  </td>

                  <td>
                     {object['mimeType']}
                  </td>

                  <td>
                     {
                        object['mimeType'] === 'audio/mpeg' ? (
                           <AdminAudio src={`resource/${object.id}/content`} />
                        ) : object['mimeType'] === 'image/jpeg' ? (
                           <AdminImage
                              src={`resource/${object.id}/content`}
                              alt={object.name}
                              width={150}
                           />
                        ) : (null)
                     }
                  </td>

                  <td className='text-end'>
                     <AdminEdit admin={{ modul: "resource", unique: object.id.toString() }}>
                        <FormularResources data={object} />
                     </AdminEdit>
                  </td>

               </tr>
            ))}
         </AdminTable>

         <AdminInsert admin={{ modul: "resource" }}>
            <FormularResources data={data} />
         </AdminInsert>
      </>
   );
};


export default Resource;
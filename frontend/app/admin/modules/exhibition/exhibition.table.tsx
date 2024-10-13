import React from 'react';

import Image from 'next/image';

import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';

type Props = {
   admin: AdminType;
   data: any;
};


const Table: React.FC<Props> = ({ admin, data }) => {

   const columns = [
      { name: "Name" },
      { name: "Gallery" },
      { name: "Date" },
      { name: "Curator" },
      { name: "Active" }
   ];

   return (
      <A.Table columns={columns}>
         {data.map((object: any, index: any) => (
            <A.TableRow data={object} admin={admin} key={index}>

               <A.TableColumn>
                  <strong>
                     <A.LinkIcon admin={{ module: "exhibition", action: "detail", unique: object['id'] }}>
                        {object['name']}
                     </A.LinkIcon>
                  </strong>
               </A.TableColumn>

               <A.TableColumn>
                  <A.Link admin={{ module: "gallery", action: "detail", unique: object['gallery']['id'] }}>
                     {object['gallery']['name']}
                  </A.Link>
               </A.TableColumn>

               <A.TableColumn>
                  <A.Icon name="date" size={24} className='me-2' />
                  <A.Date date={object['fromDate']} />  ~ <A.Date date={object['toDate']} />
               </A.TableColumn>

               <A.TableColumn>
                  {object['curator']}
               </A.TableColumn>

               <A.TableColumn>
                  <A.Boolean value={object['active']} />
               </A.TableColumn>
            </A.TableRow>
         ))}
      </A.Table>
   );
};


export default Table;
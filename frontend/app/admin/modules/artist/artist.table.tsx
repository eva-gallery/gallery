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
      { name: "Category" },
      { name: "Country" },
      { name: "Active" }
   ];

   return (
      <A.Table columns={columns}>

         {data.map((object: any) => (
            <A.TableRow data={object} admin={admin} key={object["id"]}>

               <A.TableColumn>
                  <strong>
                     <A.LinkIcon admin={{ module: "artist", action: "detail", unique: object['id'] }}>
                        {object["name"]}
                     </A.LinkIcon>

                  </strong>
               </A.TableColumn>

               <A.TableColumn>
                  {object["artistCategory"]["name"]}
               </A.TableColumn>

               <A.TableColumn>
                  <A.Flag code={object['country']['code']} />
                  {object["country"]["name"]}
               </A.TableColumn>

               <A.TableColumn>
                  <A.Boolean value={object["active"]} />
               </A.TableColumn>

            </A.TableRow>
         ))}

      </A.Table>
   );
};


export default Table;
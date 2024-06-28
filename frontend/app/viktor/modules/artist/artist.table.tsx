import React from 'react';

import Image from 'next/image';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';

type Props = {
   viktor: ViktorType;
   data: any;
};


const Table: React.FC<Props> = ({ viktor, data }) => {

   const columns = [
      { name: "Name" },
      { name: "Category" },
      { name: "Country" },
      { name: "Active" }
   ];

   return (
      <V.Table columns={columns}>

         {data.map((object: any) => (
            <V.Table.Row data={object} viktor={viktor}>

               <V.Table.Column>
                  <strong>
                     <V.Link.Icon viktor={viktor}>
                        {object.data["name"]}
                     </V.Link.Icon>

                  </strong>
               </V.Table.Column>

               <V.Table.Column>
                  {object.parent["artist_category"].data["name"]}
               </V.Table.Column>

               <V.Table.Column>
                  <V.Flag code={object.parent['country'].data['code']} />
                  {object.parent["country"].data["name"]}
               </V.Table.Column>

               <V.Table.Column>
                  <V.Boolean value={object.data["active"]} />
               </V.Table.Column>

            </V.Table.Row>
         ))}

      </V.Table>
   );
};


export default Table;
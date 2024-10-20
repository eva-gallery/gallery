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
      { name: "Artist" },
      { name: "Image" },
      { name: "Year" },
      { name: "Active" }
   ];

   return (
      <V.Table columns={columns}>

         {data.map((object: any) => (

            <V.Table.Row data={object} viktor={viktor}>

               <V.Table.Column>
                  <strong>
                     <V.Link.Icon viktor={viktor}>
                        {object.data['name']}
                     </V.Link.Icon>
                  </strong>
               </V.Table.Column>

               <V.Table.Column>
                  <V.Link.Icon viktor={{ module: "artist", action: "detail", unique: object.parent['artist'].unique }}>
                     {object.parent['artist'].data['name']}
                  </V.Link.Icon>
               </V.Table.Column>

               <V.Table.Column>
                  <Image src={`/${object.data['image']}`} alt={object.data['name']} width="100" height="100" className='img-fluid' />
               </V.Table.Column>

               <V.Table.Column>
                  {object.data['year']}
               </V.Table.Column>

               <V.Table.Column>
                  <V.Boolean value={object.data['active']} />
               </V.Table.Column>

            </V.Table.Row>

         ))}

      </V.Table>
   );
};


export default Table;
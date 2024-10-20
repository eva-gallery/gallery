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
      { name: "Gallery" },
      { name: "Date" },
      { name: "Curator" },
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
                  <V.Link viktor={{ module: "gallery", action: "detail", unique: object.parent['gallery'].unique }}>
                     {object.parent['gallery'].data['name']}
                  </V.Link>
               </V.Table.Column>

               <V.Table.Column>
                  <V.Icon name="date" size={24} className='me-2' />
                  <V.Date date={object.data['date_since']} />  ~ <V.Date date={object.data['date_to']} />
               </V.Table.Column>

               <V.Table.Column>
                  {object.data['curator']}
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
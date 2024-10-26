import React from 'react';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';
import { F } from '@/app/framework';
import { M } from '@/app/viktor/modules';

export async function List(viktor: ViktorType) {


   let dataX = new F.dataX(viktor.module);
   await dataX.getData({
      parents: true,
      deleted: false
   });
   const data = dataX.objects;







   return (
      <>
         <V.List viktor={viktor}>
            <M.Artist.Table viktor={viktor} data={data} />
         </V.List>

      </>
   );
}




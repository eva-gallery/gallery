import React from 'react';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';
import { F } from '@/app/framework';
import { M } from '@/app/viktor/modules';

export async function List(viktor: ViktorType) {


   const data = await V.getData(viktor);


   return (
      <>
         <V.List viktor={viktor}>
            <M.Gallery.Table viktor={viktor} data={data} />
         </V.List >
      </>
   );
}

import React from 'react';


import { AdminType } from '@/app/admin/types';
import { AdminGetData } from '../../functions/get.data';
import AdminList from '../../components/list';
import { M } from '..';


export async function List(admin: AdminType) {

   const data = await AdminGetData("admin/artwork");

   const option = {
      "artist": await AdminGetData("admin/options/artist"),
      "artwork_genre": await AdminGetData("admin/options/artwork_genre"),
      "artwork_worktype": await AdminGetData("admin/options/artwork_worktype"),
      "artwork_material": await AdminGetData("admin/options/artwork_material"),
      "artwork_technique": await AdminGetData("admin/options/artwork_technique"),
   };

   const object = {
      data,
      option,
   }

   return (
      <>
         <AdminList admin={admin} object={object}>
            <M.Artwork.Table admin={admin} data={data} />
         </AdminList >
      </>
   );
}





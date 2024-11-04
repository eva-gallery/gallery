import React from 'react';


import { AdminGetData } from '../../functions/get.data';
import AdminList from '../../components/list';
import { AdminType } from '../../types';
import { M } from '..';


export async function List(admin: AdminType) {

   const data = await AdminGetData("admin/artist");

   const option = {
      "country": await AdminGetData("admin/options/country"),
      "artist_category": await AdminGetData("admin/options/artist_category"),
   };

   const object = {
      data,
      option,
   }

   return (
      <>
         <AdminList admin={admin} object={object}>
            <M.Artist.Table admin={admin} data={data} />
         </AdminList>

      </>
   );
}




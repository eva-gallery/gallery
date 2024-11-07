'use server'

import React from 'react';

import { AdminType } from '../../types';
import { AdminGetData } from '../../functions/get.data';
import AdminList from '../../components/list';
import { M } from '..';


export async function List(admin: AdminType) {

   const data = await AdminGetData("admin/gallery");

   const option = {
      "country": await AdminGetData("admin/options/country"),
   };

   const object = {
      data,
      option,
   }

   return (
      <>
         <AdminList admin={admin} object={object}>
            <M.Gallery.Table admin={admin} data={data} />
         </AdminList >
      </>
   );
}

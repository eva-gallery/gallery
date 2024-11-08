'use server'

import React from 'react';
import { cookies } from 'next/headers';

import { M } from '..';
import AdminList from '../../components/list';
import { AdminGetData } from '../../functions/get.data';
import { AdminType } from '../../types';


export async function List(admin: AdminType) {

   const data = await AdminGetData("admin/room");



   const option = {
      "exhibition": await AdminGetData("admin/options/exhibition"),
   };

   const object = {
      data,
      option,
   }


   const cookieStore = cookies().get('SESSION_ID');
   const sessionId = cookieStore?.value || '';

   return (
      <>
         <AdminList admin={admin} object={object}>
            <M.Designer.Table admin={admin} data={data} />
         </AdminList>


         <M.Designer.UnityDesignSelect token={sessionId} data={data} />

      </>
   );
}





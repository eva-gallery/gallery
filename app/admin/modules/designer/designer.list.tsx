'use server'

import React from 'react';
import { cookies } from 'next/headers';

import { M } from '..';
import AdminList from '../../components/list';
import { AdminGetData } from '../../functions/get.data';
import { AdminType } from '../../types';


export async function List(admin: AdminType) {

   const data = await AdminGetData("admin/room");
   const resource = await AdminGetData("admin/resource");
   const resourceAudio = await AdminGetData("admin/resource/audio");
   const resourceImage = await AdminGetData("admin/resource/image");

   const option = {
      "exhibition": await AdminGetData("admin/options/exhibition"),
      "resourceAudio": resourceAudio,
      "resourceImage": resourceImage,
   };

   const object = {
      data,
      option,
   }


   const cookieStore = cookies().get('BEARER_TOKEN');
   const sessionId = cookieStore?.value || '';

   return (
      <>
         <AdminList admin={admin} object={object}>
            <M.Designer.Table admin={admin} data={data} />
         </AdminList>


         <M.Designer.UnityDesignSelect token={sessionId} data={data} />

         <hr className='my-5' />

         <M.Designer.Resource admin={admin} data={resource} />
      </>
   );
}





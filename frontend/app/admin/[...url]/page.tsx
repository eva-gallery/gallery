'use server'

import React from 'react';

import { Container } from 'react-bootstrap';

import { AdminType } from '@/app/admin/types';

import { M } from '@/app/admin/modules';
import { A } from '@/app/admin';



export default async function Page({ params }: any) {

   const admin: AdminType = {
      module: params.url[0],
      action: params.url[1],
      unique: params.url[2],
      mode: params.url[3]
   };



   const Module = M[A.capitalize(admin.module) as keyof typeof M] || (() => <div>Unknown module</div>);

   return (

      <Container className='py-5'>
         {Module(admin)}
      </Container>

   );
}

'use server'

import React from 'react';
import { Container } from 'react-bootstrap';

import { ViktorType } from '@/app/viktor/@api/types';

import { M } from '@/app/viktor/modules';



export default async function Page({ params }: any) {

   const viktor: ViktorType = {
      module: params.url[0],
      action: params.url[1],
      unique: params.url[2],
      mode: params.url[3],
      user: 1
   };

   const module = viktor.module.charAt(0).toUpperCase() + viktor.module.slice(1);

   const ViktorModule = (viktor: ViktorType) => {
      if (M.modules.includes(viktor.module)) {
         const Function = M[module as keyof typeof M];
         return Function(viktor);
      } else {
         return <div>Unknown module</div>;
      }
   };

   return (

      <Container className='py-5'>
         {ViktorModule(viktor)}
      </Container>

   );
}

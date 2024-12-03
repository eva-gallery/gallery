'use server'

import React from 'react';

import { Container } from 'react-bootstrap';
import { AdminType } from '../types';
import { capitalize } from '../functions/tools';
import { M } from '../modules';
import { AccountProvider } from '../modules/nft/nft.connect';


export default async function Page({ params }: any) {

   const admin: AdminType = {
      modul: params.url[0],
      action: params.url[1],
      unique: params.url[2],
      mode: params.url[3]
   };



   const Modul = M[capitalize(admin.modul) as keyof typeof M] || (() => <div>Unknown module</div>);

   return (
      <AccountProvider>
      <Container className='py-5'>
         {Modul(admin)}
      </Container>
      </AccountProvider>
   );
}

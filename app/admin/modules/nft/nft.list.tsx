import React from 'react';

import { AdminType } from '@/app/admin/types';
import { Button } from 'react-bootstrap';
import AdminList from '../../components/list';
import { AdminGetData } from '../../functions/get.data';
import { M } from '..';


export async function List(admin: AdminType) {

   const data = await AdminGetData("admin/nft");

   const object = {
      data,
   }

   return (
      <>
         <AdminList admin={admin} object={object}>
            <p className='text-center mb-5'>
               Text o NFT, co ako, nejaky popis, co to je, ako to funguje, ze kazdy klik na Mint NFT nieco stoji atd.
            </p>
            <p className='text-center mb-5'>
               <Button variant="primary" className='me-2'>Connect to NFT Wallet</Button>
               <Button variant="danger">Import NFTs from blockchain</Button>
            </p>

            <M.Nft.Cards admin={admin} data={data} />
         </AdminList >
      </>
   );
}





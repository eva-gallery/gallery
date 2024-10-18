'use server'

import React from 'react';

import { Detail } from './artwork.detail';
import { List } from './artwork.list'
import Table from './artwork.table';
import Formular from './artwork.formular';

import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';



async function Artwork(admin: AdminType) {

   const actions = ["list", "detail"];

   return (
      <A.Action admin={admin} actions={Data.actions} />
   );
};


const Data = {
   actions: ["list", "detail"],
   icon: "artwork",
   name: "Artwork",
};


Artwork.Detail = Detail;
Artwork.List = List;
Artwork.Table = Table;
Artwork.Data = Data;
Artwork.Formular = Formular;

export default Artwork;



'use server'

import React from 'react';

import { Detail } from './artwork.detail';
import { List } from './artwork.list'
import Table from './artwork.table';
import { Formular, FormularExhibition } from './artwork.formular';

import AdminAction from '../../components/action';
import { AdminType } from '@/app/admin/types';
import { Transform } from './artwork.functions';
import Exhibition from './artwork.exhibition';



async function Artwork(admin: AdminType) {


   return (
      <AdminAction admin={admin} actions={Data.actions} />
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
Artwork.Exhibition = Exhibition;
Artwork.Data = Data;
Artwork.Formular = Formular;
Artwork.FormularExhibition = FormularExhibition;
Artwork.Transform = Transform;

export default Artwork;



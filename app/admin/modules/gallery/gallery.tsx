'use server'

import React from 'react';

import { Detail } from './gallery.detail';
import { List } from './gallery.list';
import Table from './gallery.table';
import { Formular } from './gallery.formular';
import { AdminType } from '../../types';
import AdminAction from '../../components/action';
import { Transform } from './gallery.functions';



const Data = {
   actions: ["list", "detail"],
   icon: "gallery",
   name: "Gallery",
};


async function Gallery(admin: AdminType) {

   return (
      <AdminAction admin={admin} actions={Data.actions} />
   );
};


Gallery.Detail = Detail;
Gallery.List = List;
Gallery.Table = Table;
Gallery.Data = Data;
Gallery.Formular = Formular;
Gallery.Transform = Transform;


export default Gallery;



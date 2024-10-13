'use server'

import React from 'react';

import { Detail } from './gallery.detail';
import { List } from './gallery.list';
import Table from './gallery.table';
import Formular from './gallery.formular';

import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';


const actions = ["list", "detail"];

const Data = {
   actions: actions,
   icon: "gallery",
   name: "Gallery",
};


async function Gallery(admin: AdminType) {
   return (
      <A.Action admin={admin} actions={actions} />
   );
};


Gallery.Detail = Detail;
Gallery.List = List;
Gallery.Table = Table;
Gallery.Data = Data;
Gallery.Formular = Formular;


export default Gallery;



'use server'

import React from 'react';

import { Detail } from './gallery.detail';
import { List } from './gallery.list';
import Table from './gallery.table';
import Form from './gallery.form';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';



async function Gallery(viktor: ViktorType) {

   const actions = ["list", "detail"];

   return (
      <V.Action viktor={viktor} actions={actions} />
   );
};

Gallery.Detail = Detail;
Gallery.List = List;
Gallery.Table = Table;
Gallery.Form = Form;

export default Gallery;



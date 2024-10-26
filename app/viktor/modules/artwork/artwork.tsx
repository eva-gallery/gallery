'use server'

import React from 'react';

import { Detail } from './artwork.detail';
import { List } from './artwork.list'
import Table from './artwork.table';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';


async function Artwork(viktor: ViktorType) {

   const actions = ["list", "detail"];

   return (
      <V.Action viktor={viktor} actions={actions} />
   );
};

Artwork.Detail = Detail;
Artwork.List = List;
Artwork.Table = Table;

export default Artwork;



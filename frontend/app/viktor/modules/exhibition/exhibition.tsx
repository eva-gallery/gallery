'use server'

import React from 'react';

import { Detail } from './exhibition.detail';
import { List } from './exhibition.list';
import Table from './exhibition.table';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';


async function Exhibition(viktor: ViktorType) {

   const actions = ["list", "detail"];

   return (
      <V.Action viktor={viktor} actions={actions} />
   );
};

Exhibition.Detail = Detail;
Exhibition.List = List;
Exhibition.Table = Table;

export default Exhibition;



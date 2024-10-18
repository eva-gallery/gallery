'use server'

import React from 'react';

import { Detail } from './exhibition.detail';
import { List } from './exhibition.list';
import Table from './exhibition.table';
import Formular from './exhibition.formular';

import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';


async function Exhibition(admin: AdminType) {

   const actions = ["list", "detail"];

   return (
      <A.Action admin={admin} actions={Data.actions} />
   );
};

const Data = {
   actions: ["list", "detail"],
   icon: "exhibition",
   name: "Exhibition",
};

Exhibition.Detail = Detail;
Exhibition.List = List;
Exhibition.Table = Table;
Exhibition.Data = Data;
Exhibition.Formular = Formular;

export default Exhibition;



'use server'

import React from 'react';

import { Detail } from './exhibition.detail';
import { List } from './exhibition.list';
import Table from './exhibition.table';
import Formular from './exhibition.formular';
import AdminAction from '../../components/action';


import { AdminType } from '@/app/admin/types';
import { Transform } from './exhibition.functions';


async function Exhibition(admin: AdminType) {

   return (
      <AdminAction admin={admin} actions={Data.actions} />
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
Exhibition.Transform = Transform;

export default Exhibition;



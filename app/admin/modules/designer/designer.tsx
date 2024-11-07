'use server'
import React from 'react';

import { List } from './designer.list';
import Table from './designer.table';
import { UnityDesign, UnityDesignSelect } from './designer.unity';
import { Detail } from './designer.detail';
import { AdminType } from '../../types';
import AdminAction from '../../components/action';
import Formular from './designer.formular';
import { Transform } from './designer.functions';


const Data = {
    actions: ["list", "detail"],
    icon: "designer",
    name: "Designer",
};

export async function Designer(admin: AdminType) {
    return (
        <AdminAction admin={admin} actions={Data.actions} />
    );
};

Designer.Data = Data;
Designer.List = List;
Designer.Table = Table;
Designer.UnityDesignSelect = UnityDesignSelect;
Designer.UnityDesign = UnityDesign;
Designer.Detail = Detail;
Designer.Formular = Formular;
Designer.Transform = Transform;

export default Designer;



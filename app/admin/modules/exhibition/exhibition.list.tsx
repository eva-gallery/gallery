'use server'

import React from 'react';

import { AdminType } from '../../types';
import { AdminGetData } from '../../functions/get.data';
import AdminList from '../../components/list';
import { M } from '..';

export async function List(admin: AdminType) {


    const data = await AdminGetData("admin/exhibition");

    const option = {
        "gallery": await AdminGetData("admin/options/gallery"),
    };

    const object = {
        data,
        option
    }

    return (
        <>
            <AdminList admin={admin} object={object}>
                <M.Exhibition.Table admin={admin} data={data} />
            </AdminList>
        </>
    );
}




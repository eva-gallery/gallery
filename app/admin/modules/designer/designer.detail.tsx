'use server'

import React from 'react';

import { AdminGetData } from '../../functions/get.data';
import { cookies } from 'next/headers';
import { AdminType } from '../../types';
import AdminDetail from '../../components/detail';
import { AdminLink } from '../../components/components';
import { M } from '..';


export async function Detail(admin: AdminType) {


    const d = await AdminGetData("admin/designer/room/" + admin.unique);
    const exhibition = await AdminGetData("admin/exhibition/" + d['exhibitionId']);

    const data = {
        ...d,
        exhibition: {
            ...exhibition
        }
    };

    const option = {
        "exhibition": await AdminGetData("admin/options/exhibition"),
    };

    const object = {
        data,
        option,
    }


    const cookieStore = cookies().get('SESSION_ID');
    const sessionId = cookieStore?.value || '';

    return (
        <>
            <AdminDetail admin={admin} object={object}>
                <AdminDetail.Row icon="designer" name="Name">
                    <strong className='fs-3'>
                        {data['name']}
                    </strong>
                </AdminDetail.Row>


                <AdminDetail.Row icon="exhibition" name="Exhibition">
                    <AdminLink admin={{ modul: "exhibition", action: "detail", unique: data['exhibition'].id }}>
                        {data['exhibition']['name']}
                    </AdminLink>
                </AdminDetail.Row>


            </AdminDetail>

            <M.Designer.UnityDesign token={sessionId} uuid={data.id} />
        </>
    );
}




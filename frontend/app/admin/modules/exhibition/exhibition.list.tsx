import React from 'react';

import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';
import { M } from '@/app/admin/modules';


export async function List(admin: AdminType) {


    const data = await A.getData(admin);


    return (
        <>
            <A.List admin={admin}>
                <M.Exhibition.Table admin={admin} data={data} />
            </A.List>
        </>
    );
}




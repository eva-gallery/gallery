import React from 'react';

import { A } from '@/app/admin';

import { AdminType } from '@/app/admin/types';

import { M } from '@/app/admin/modules';


export async function Detail(admin: AdminType) {


    const object = await A.getData(admin);

    admin.mode = "exhibition";
    const exhibition = await A.getData(admin);

    return (
        <>
            <A.Detail admin={admin} object={object}>
                <A.Detail.Row icon="gallery" name="Name">
                    <strong className='fs-3'>
                        {object['name']}
                    </strong>
                </A.Detail.Row>

                <A.Detail.Row icon="textarea" name="Description">
                    <A.Html html={object['description']} />
                </A.Detail.Row>

                <A.Detail.Row icon="address" name="Address">
                    <span className='text-pre'>
                        {object['address']}
                    </span>
                </A.Detail.Row>

                <A.Detail.Row icon="globe" name="Country">
                    <A.Flag code={object['country']['code']} />
                    {object['country']['name']}
                </A.Detail.Row>

                <A.Detail.Row icon="map" name="GPS">
                    {object.gps}
                    {object.gps && <A.Map gps={object.gps} />}
                </A.Detail.Row>

                <A.Detail.Row icon="boolean" name="Active">
                    <A.Boolean value={object['active']} />
                </A.Detail.Row>
            </A.Detail>

            <hr className='my-5' />

            <h2 className='text-center'>Exhibitions <small>in Gallery</small></h2>

            <M.Exhibition.Table admin={{ "module": "exhibition" }} data={exhibition} />
        </>
    );
}




import React from 'react';

import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';

import { M } from '@/app/admin/modules';

export async function Detail(admin: AdminType) {

    const object = await A.getData(admin);

    admin.mode = "artwork";
    const artwork = await A.getData(admin);


    return (
        <>
            <A.Detail admin={admin} object={object}>
                <A.Detail.Row icon="exhibition" name="Name">
                    <strong className='fs-3'>
                        {object['name']}
                    </strong>
                </A.Detail.Row>

                <A.Detail.Row icon="date" name="Date since">
                    <A.Date date={object['fromDate']} />
                </A.Detail.Row>

                <A.Detail.Row icon="date" name="Date to">
                    <A.Date date={object['toDate']} />
                </A.Detail.Row>

                <A.Detail.Row icon="client" name="Curator">
                    {object['curator']}
                </A.Detail.Row>

                <A.Detail.Row icon="gallery" name="Gallery">
                    <A.Link admin={{ module: "gallery", action: "detail", unique: object['gallery']['id'] }}>
                        {object["gallery"]["name"]}
                    </A.Link>
                </A.Detail.Row>

                <A.Detail.Row icon="boolean" name="Active">
                    <A.Boolean value={object['active']} />
                </A.Detail.Row>
            </A.Detail>

            <hr className='my-5' />

            <h2 className='text-center'>Artworks <small>in Exhibition</small></h2>

            <M.Artwork.Table admin={{ "module": "artwork" }} data={artwork} />
        </>
    );
}




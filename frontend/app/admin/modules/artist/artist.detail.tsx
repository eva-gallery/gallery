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

                <A.Detail.Row icon="artist" name="Name">
                    <strong className='fs-3'>
                        {object['name']}
                    </strong>
                </A.Detail.Row>

                <A.Detail.Row icon="date" name="Born">
                    <A.Date date={object['born']} />
                </A.Detail.Row>

                <A.Detail.Row icon="textarea" name="Bio">
                    <A.Html html={object['biography']} />
                </A.Detail.Row>

                <A.Detail.Row icon="globe" name="Country">
                    <A.Flag code={object['country']['code']} />
                    {object['country']['name']}
                </A.Detail.Row>

                <A.Detail.Row icon="category" name="Category">
                    {object['artistCategory']['name']}
                </A.Detail.Row>

                <A.Detail.Row icon="question" name="Active">
                    <A.Boolean value={object['active']} />
                </A.Detail.Row>

            </A.Detail>

            <hr className='my-5' />

            <h2 className='text-center'>Artworks <small>by Artist</small></h2>

            <M.Artwork.Table admin={{ "module": "artwork" }} data={artwork} />
        </>
    );
}



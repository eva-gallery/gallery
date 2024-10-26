import React from 'react';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';
import { F } from '@/app/framework';

import { M } from '@/app/viktor/modules';

export async function Detail(viktor: ViktorType) {

    let object = new F.objectX(viktor.module);
    await object.getDataUnique(viktor.unique);
    await object.getParents();

    let artwork = new F.dataX("artwork");
    artwork.data = await F.sql("SELECT artwork.* FROM exhibition_artwork JOIN exhibition ON exhibition.id = exhibition_artwork.`exhibition-label` JOIN artwork ON artwork.id = exhibition_artwork.`artwork-label` WHERE exhibition.id = '" + object.id + "' AND artwork.deleted = 0;");
    await artwork.dataObjectX();
    await artwork.dataParents();





    return (
        <>
            <V.Detail viktor={viktor} data={object}>
                <V.Detail.Row icon="exhibition" name="Name">
                    <strong className='fs-3'>
                        {object.data['name']}
                    </strong>
                </V.Detail.Row>

                <V.Detail.Row icon="date" name="Date since">
                    <V.Date date={object.data['date_since']} />
                </V.Detail.Row>

                <V.Detail.Row icon="date" name="Date to">
                    <V.Date date={object.data['date_to']} />
                </V.Detail.Row>

                <V.Detail.Row icon="client" name="Curator">
                    {object.data['curator']}
                </V.Detail.Row>

                <V.Detail.Row icon="gallery" name="Gallery">
                    <V.Link viktor={{ module: "gallery", action: "detail", unique: object.parent['gallery'].unique }}>
                        {object.parent["gallery"].data["name"]}
                    </V.Link>
                </V.Detail.Row>

                <V.Detail.Row icon="boolean" name="Active">
                    <V.Boolean value={object.data['active']} />
                </V.Detail.Row>
            </V.Detail>

            <hr className='my-5' />

            <h2 className='text-center'>Artwork</h2>

            <M.Artwork.Table viktor={{ "module": "artwork" }} data={artwork.objects} />
        </>
    );
}




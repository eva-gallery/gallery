import React from 'react';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';
import { F } from '@/app/framework';
import { M } from '@/app/viktor/modules';

export async function Detail(viktor: ViktorType) {

    let object = new F.objectX(viktor.module);
    await object.getDataUnique(viktor.unique);
    await object.getParents();

    let artworks = new F.dataX("artwork");
    await artworks.getData({
        where: {
            "artist-label": object.id
        },
        parents: true,
        deleted: false,
    })

    console.log(artworks);

    return (
        <>
            <V.Detail viktor={viktor} data={object}>
                <V.Detail.Row icon="artist" name="Name">
                    <strong className='fs-3'>
                        {object.data['name']}
                    </strong>
                </V.Detail.Row>

                <V.Detail.Row icon="date" name="Born">
                    <V.Date date={object.data['born']} />
                </V.Detail.Row>

                <V.Detail.Row icon="textarea" name="Bio">
                    <V.Html html={object.data['bio']} />
                </V.Detail.Row>

                <V.Detail.Row icon="globe" name="Country">
                    <V.Flag code={object.parent['country'].data['code']} />
                    {object.parent['country'].data['name']}
                </V.Detail.Row>

                <V.Detail.Row icon="category" name="Category">
                    {object.parent['artist_category'].data['name']}
                </V.Detail.Row>

                <V.Detail.Row icon="boolean" name="Active">
                    <V.Boolean value={object.data['active']} />
                </V.Detail.Row>
            </V.Detail>

            <hr className='my-5' />

            <h2 className='text-center'>Artwork</h2>

            <M.Artwork.Table viktor={{ "module": "artwork" }} data={artworks.objects} />
        </>
    );
}



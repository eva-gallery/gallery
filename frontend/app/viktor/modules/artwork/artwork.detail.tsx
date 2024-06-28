import React from 'react';
import Image from 'next/image';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';
import { F } from '@/app/framework';
import { M } from '@/app/viktor/modules';

export async function Detail(viktor: ViktorType) {

    let object = new F.objectX(viktor.module);
    await object.getDataUnique(viktor.unique);
    await object.getParents();

    let exhibition = new F.dataX("exhibition");
    exhibition.data = await F.sql("SELECT exhibition.* FROM exhibition_artwork JOIN exhibition ON exhibition.id = exhibition_artwork.`exhibition-label` JOIN artwork ON artwork.id = exhibition_artwork.`artwork-label` WHERE artwork.id = '" + object.id + "' AND exhibition.deleted = 0;");
    await exhibition.dataObjectX();
    await exhibition.dataParents();




    return (
        <>
            <V.Detail viktor={viktor} data={object}>
                <V.Detail.Row icon="artwork" name="Name">
                    <strong className='fs-3'>
                        {object.data['name']}
                    </strong>
                </V.Detail.Row>

                <V.Detail.Row icon="textarea" name="Description">
                    <V.Html html={object.data['description']} />
                </V.Detail.Row>

                <V.Detail.Row icon="artist" name="Artist">
                    <V.Link viktor={{ module: "artist", action: "detail", unique: object.parent['artist'].unique }}>
                        {object.parent['artist'].data['name']}
                    </V.Link>
                </V.Detail.Row>

                <V.Detail.Row icon="artwork" name="Image">
                    <a href={`/${object.data.image}`} target='_blank'>
                        <Image src={`/${object.data.image}`} alt={object.data.name} width="280" height="280" className='img-fluid' />
                    </a>
                </V.Detail.Row>

                <V.Detail.Row icon="category" name="Category">
                    {object.data['category']}
                </V.Detail.Row>

                <V.Detail.Row icon="date" name="Year">
                    {object.data['year']}
                </V.Detail.Row>

                <V.Detail.Row icon="art" name="Genre">
                    {object.parent['artwork_genre'].data['name']}
                </V.Detail.Row>

                <V.Detail.Row icon="worktype" name="Worktype">
                    {object.parent["artwork_worktype"].data['name']}
                </V.Detail.Row>

                <V.Detail.Row icon="paper" name="Material">
                    {object.parent["artwork_material"].data['name']}
                </V.Detail.Row>

                <V.Detail.Row icon="palette" name="Technique">
                    {object.parent["artwork_technique"].data['name']}
                </V.Detail.Row>

                <V.Detail.Row icon="measurements" name="Measurements">
                    {object.data['measurements']}
                </V.Detail.Row>

                <V.Detail.Row icon="boolean" name="Active">
                    <V.Boolean value={object.data['active']} />
                </V.Detail.Row>
            </V.Detail>

            <hr className='my-5' />

            <h2 className='text-center'>Exhibition</h2>

            <M.Exhibition.Table viktor={{ "module": "exhibition" }} data={exhibition.objects} />
        </>
    );
}




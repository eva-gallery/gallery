import React from 'react';

import { V } from '@/app/viktor';

import { ViktorType } from '@/app/viktor/@api/types';
import { F } from '@/app/framework';

import { M } from '@/app/viktor/modules';


export async function Detail(viktor: ViktorType) {

    let object = new F.objectX(viktor.module);
    await object.getDataUnique(viktor.unique);
    await object.getParents();

    let exhibition = new F.dataX("exhibition");
    await exhibition.getData({
        where: {
            "gallery-label": object.id,
        },
        parents: true
    })

    return (
        <>
            <V.Detail viktor={viktor} data={object}>
                <V.Detail.Row icon="gallery" name="Name">
                    <strong className='fs-3'>
                        {object.data['name']}
                    </strong>
                </V.Detail.Row>

                <V.Detail.Row icon="textarea" name="Description">
                    <V.Html html={object.data['description']} />
                </V.Detail.Row>

                <V.Detail.Row icon="address" name="Address">
                    {object.data['street']}<br />
                    {object.data['postcode']} {object.data['city']}
                </V.Detail.Row>

                <V.Detail.Row icon="globe" name="Country">
                    <V.Flag code={object.parent['country'].data['code']} />
                    {object.parent['country'].data['name']}
                </V.Detail.Row>

                <V.Detail.Row icon="map" name="GPS">
                    {object.data.gps}
                    {object.data.gps && <V.Map gps={object.data.gps} />}
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




import React from 'react';
import Image from 'next/image';

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
                <A.Detail.Row icon="artwork" name="Name">
                    <strong className='fs-3'>
                        {object['name']}
                    </strong>
                </A.Detail.Row>

                <A.Detail.Row icon="textarea" name="Description">
                    <A.Html html={object['description']} />
                </A.Detail.Row>

                <A.Detail.Row icon="artist" name="Artist">
                    <A.Link admin={{ module: "artist", action: "detail", unique: object['artist'].id }}>
                        {object['artist']['name']}
                    </A.Link>
                </A.Detail.Row>

                <A.Detail.Row icon="artwork" name="Image">
                    <A.Image src={`artwork/${object['id']}/thumbnail`} alt={object['name']} width={480} height="auto" type="thumbnail" hocico="fdsdlfjal" balba="fsdafa" />
                </A.Detail.Row>

                <A.Detail.Row icon="date" name="Year">
                    {object['year']}
                </A.Detail.Row>

                <A.Detail.Row icon="nft" name="NFT">
                    <A.Boolean value={object['nft']} />
                </A.Detail.Row>

                <A.Detail.Row icon="ai" name="AI">
                    <A.Boolean value={object['nft']} />
                </A.Detail.Row>

                <A.Detail.Row icon="date" name="tags">
                    {object['tags']}
                </A.Detail.Row>

                <A.Detail.Row icon="art" name="Genre">
                    {object['artworkGenre']['name']}
                </A.Detail.Row>

                <A.Detail.Row icon="worktype" name="Worktype">
                    {object["artworkWorktype"]['name']}
                </A.Detail.Row>

                <A.Detail.Row icon="paper" name="Material">
                    {object["artworkMaterial"]['name']}
                </A.Detail.Row>

                <A.Detail.Row icon="palette" name="Technique">
                    {object["artworkTechnique"]['name']}
                </A.Detail.Row>

                <A.Detail.Row icon="measurements" name="Measurements">
                    {object['measurements']}
                </A.Detail.Row>

                <A.Detail.Row icon="boolean" name="Active">
                    <A.Boolean value={object['active']} />
                </A.Detail.Row>
            </A.Detail>

            <hr className='my-5' />

            <h2 className='text-center'><small>Artwork in</small> Exhibitions</h2>

            <M.Exhibition.Table admin={{ "module": "exhibition" }} data={exhibition} />
        </>
    );
}




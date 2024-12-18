import React from 'react';
import { AdminGetData } from '../../functions/get.data';
import AdminDetail from '../../components/detail';
import { AdminType } from '../../types';
import { AdminBoolean, AdminHtml, AdminLink } from '../../components/components';
import AdminImage from '../../components/image';
import { M } from '..';
import AdminInsert from '../../components/insert';

export async function Detail(admin: AdminType) {


    const data = await AdminGetData("admin/artwork/" + admin.unique);
    let wallet = null;
    const evaWallet = await AdminGetData("nft/wallet/eva");

    if (data['nft']) {
        wallet = await AdminGetData("admin/wallet/" + data['nft'].walletId);
        if (data['nft'].walletId === evaWallet.id)
            {
                wallet.walletAddress = "NFT Trial minted via EVA Gallery";
            }
    }
    const option = {
        "artist": await AdminGetData("admin/options/artist"),
        "artwork_genre": await AdminGetData("admin/options/artwork_genre"),
        "artwork_worktype": await AdminGetData("admin/options/artwork_worktype"),
        "artwork_material": await AdminGetData("admin/options/artwork_material"),
        "artwork_technique": await AdminGetData("admin/options/artwork_technique"),
        "exhibition": await AdminGetData("admin/options/exhibition"),
    };


    const object = {
        data,
        option,
    }

    const exhibition = await AdminGetData("admin/artwork/" + admin.unique + "/exhibition");

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '/admin';

    return (
        <>
            <AdminDetail admin={admin} object={object}>
                <AdminDetail.Row icon="artwork" name="Name">
                    <strong className='fs-3'>
                        {data['name']}
                    </strong>
                </AdminDetail.Row>

                <AdminDetail.Row icon="textarea" name="Description">
                    <AdminHtml html={data['description']} />
                </AdminDetail.Row>

                <AdminDetail.Row icon="artist" name="Artist">
                    <AdminLink admin={{ modul: "artist", action: "detail", unique: data['artist'].id }}>
                        {data['artist']['name']}
                    </AdminLink>
                </AdminDetail.Row>

                <AdminDetail.Row icon="artwork" name="Image">
                    <a href={`${backendUrl}/artwork/${data['id']}/image`} target='_blank'>
                        <AdminImage src={`artwork/${data['id']}/thumbnail`} alt={data['name']} width={480} />
                    </a>
                </AdminDetail.Row>

                <AdminDetail.Row icon="date" name="Year">
                    {data['year']}
                </AdminDetail.Row>

                <AdminDetail.Row icon="nft" name="NFT">
                    {data['nft'] ? (
                        <>
                            <AdminBoolean value={true} />
                            <p>
                                Minted by wallet: {wallet.walletAddress} <br />
                                Check NFT online:&#160;
                                <a href={data['nft'].onlineCheck} target='_blank'>
                                    Proof of existence
                                </a>
                            </p>
                        </>
                    ) : (
                        <AdminBoolean value={false} />
                    )}
                </AdminDetail.Row>

                <AdminDetail.Row icon="ai" name="AI">
                    <AdminBoolean value={data['ai']} />
                </AdminDetail.Row>

                <AdminDetail.Row icon="date" name="tags">
                    {data['tags']}
                </AdminDetail.Row>

                <AdminDetail.Row icon="art" name="Genre">
                    {data['artworkGenre']?.name || 'Not specified'}
                </AdminDetail.Row>

                <AdminDetail.Row icon="worktype" name="Worktype">
                    {data["artworkWorktype"]?.name || 'Not specified'}
                </AdminDetail.Row>

                <AdminDetail.Row icon="paper" name="Material">
                    {data["artworkMaterial"]?.name || 'Not specified'}
                </AdminDetail.Row>

                <AdminDetail.Row icon="palette" name="Technique">
                    {data["artworkTechnique"]?.name || 'Not specified'}
                </AdminDetail.Row>

                <AdminDetail.Row icon="measurements" name="Measurements">
                    {data['measurements']}
                </AdminDetail.Row>

                <AdminDetail.Row icon="question" name="Public">
                    <AdminBoolean value={data['public']} />
                </AdminDetail.Row>
            </AdminDetail>

            <hr className='my-5' />

            <h2 className='text-center'><small>Artwork in</small> Exhibitions</h2>

            <M.Exhibition.Table admin={{ modul: "exhibition" }} data={exhibition} />

            <AdminInsert admin={admin}>
                <M.Artwork.FormularExhibition data={object.data} option={object.option} />
            </AdminInsert>

        </>
    );
}




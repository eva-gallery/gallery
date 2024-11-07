import React from 'react';
import { AdminGetData } from '../../functions/get.data';
import AdminDetail from '../../components/detail';
import { AdminBoolean, AdminDate, AdminFlag, AdminHtml } from '../../components/components';
import { M } from '..';
import { AdminType } from '../../types';


export async function Detail(admin: AdminType) {


    const data = await AdminGetData("admin/artist/" + admin.unique);

    const option = {
        "country": await AdminGetData("admin/options/country"),
        "artist_category": await AdminGetData("admin/options/artist_category"),
    };

    const object = {
        data,
        option,
    }

    const artwork = await AdminGetData("admin/artist/" + admin.unique + "/artwork");

    return (
        <>
            <AdminDetail admin={admin} object={object}>

                <AdminDetail.Row icon="artist" name="Name">
                    <strong className='fs-3'>
                        {data['name']}
                    </strong>
                </AdminDetail.Row>

                <AdminDetail.Row icon="date" name="Born">
                    <AdminDate date={data['born']} />
                </AdminDetail.Row>

                <AdminDetail.Row icon="textarea" name="Bio">
                    <AdminHtml html={data['biography']} />
                </AdminDetail.Row>

                <AdminDetail.Row icon="globe" name="Country">
                    <AdminFlag code={data['country']['code']} />
                    {data['country']['name']}
                </AdminDetail.Row>

                <AdminDetail.Row icon="category" name="Category">
                    {data['artistCategory']['name']}
                </AdminDetail.Row>

                <AdminDetail.Row icon="question" name="Public">
                    <AdminBoolean value={data['public']} />
                </AdminDetail.Row>

            </AdminDetail>

            <hr className='my-5' />

            <h2 className='text-center'>Artworks <small>by Artist</small></h2>

            <M.Artwork.Table admin={{ modul: "artwork" }} data={artwork} />
        </>
    );
}



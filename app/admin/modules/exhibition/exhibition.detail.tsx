'use server'

import React from 'react';

import { AdminType } from '../../types';
import { AdminGetData } from '../../functions/get.data';
import AdminDetail from '../../components/detail';
import { AdminBoolean, AdminDate, AdminFlag, AdminHtml, AdminLink } from '../../components/components';
import { M } from '..';


export async function Detail(admin: AdminType) {

    const data = await AdminGetData("admin/exhibition/" + admin.unique);

    const option = {
        "gallery": await AdminGetData("admin/options/gallery"),
        "country": await AdminGetData("admin/options/country"),
        "artist_category": await AdminGetData("admin/options/artist_category"),
    };

    const object = {
        data,
        option,
    }

    const designer = await AdminGetData("admin/exhibition/" + admin.unique + "/room");

    const updatedDesigner = designer.map((des: any) => ({
        ...des,
        exhibition: {
            ...data
        }
    }));

    const artwork = await AdminGetData("admin/exhibition/" + admin.unique + "/artwork");


    return (
        <>
            <AdminDetail admin={admin} object={object}>
                <AdminDetail.Row icon="exhibition" name="Name">
                    <strong className='fs-3'>
                        {data['name']}
                    </strong>
                </AdminDetail.Row>

                <AdminDetail.Row icon="date" name="Date since">
                    <AdminDate date={data['fromDate']} />
                </AdminDetail.Row>

                <AdminDetail.Row icon="date" name="Date to">
                    <AdminDate date={data['toDate']} />
                </AdminDetail.Row>

                <AdminDetail.Row icon="client" name="Curator">
                    {data['curator']}
                </AdminDetail.Row>

                <AdminDetail.Row icon="gallery" name="Gallery">
                    <AdminLink admin={{ modul: "gallery", action: "detail", unique: data['gallery']['id'] }}>
                        {data["gallery"]["name"]}
                    </AdminLink>
                </AdminDetail.Row>

                <AdminDetail.Row icon="question" name="Public">
                    <AdminBoolean value={data['public']} />
                </AdminDetail.Row>
            </AdminDetail>

            <hr className='my-5' />

            <h2 className='text-center'>Artworks <small>in Exhibition</small></h2>
            <M.Artwork.Table admin={{ modul: "artwork" }} data={artwork} />

            <h2 className='text-center'>3D Designs <small>in Exhibition</small></h2>
            <M.Designer.Table admin={{ modul: "designer" }} data={updatedDesigner} />



        </>
    );
}




'use server'

import React from 'react';

import { AdminType } from '../../types';
import { AdminGetData } from '../../functions/get.data';
import AdminDetail from '../../components/detail';
import { AdminBoolean, AdminFlag, AdminHtml } from '../../components/components';
import AdminMap from '../../components/map';
import { M } from '..';
import { AdminImageCheck } from '../../components/image';




export async function Detail(admin: AdminType) {


    const data = await AdminGetData("admin/gallery/" + admin.unique);

    const option = {
        "country": await AdminGetData("admin/options/country"),
    };

    const object = {
        data,
        option,
    }

    const exhibition = await AdminGetData("admin/gallery/" + admin.unique + "/exhibition");

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '/admin';

    return (
        <>
            <AdminDetail admin={admin} object={object}>
                <AdminDetail.Row icon="gallery" name="Name">
                    <strong className='fs-3'>
                        {data['name']}
                    </strong>
                </AdminDetail.Row>

                <AdminDetail.Row icon="textarea" name="Description">
                    <AdminHtml html={data['description']} />
                </AdminDetail.Row>

                <AdminDetail.Row icon="address" name="Address">
                    <span className='text-pre'>
                        {data['address']}
                    </span>
                </AdminDetail.Row>

                <AdminDetail.Row icon="globe" name="Country">
                    <AdminFlag code={data['country']['code']} />
                    {data['country']['name']}
                </AdminDetail.Row>

                <AdminDetail.Row icon="artwork" name="Image">
                    <a href={`${backendUrl}/gallery/${data['id']}/image`} target='_blank'>
                        <AdminImageCheck src={`gallery/${data['id']}/image`} alt={data['name']} width={480} />
                    </a>
                </AdminDetail.Row>

                <AdminDetail.Row icon="question" name="Public">
                    <AdminBoolean value={data['public']} />
                </AdminDetail.Row>
            </AdminDetail>

            <hr className='my-5' />

            <h2 className='text-center'>Exhibitions <small>in Gallery</small></h2>

            <M.Exhibition.Table admin={{ modul: "exhibition" }} data={exhibition} />
        </>
    );
}




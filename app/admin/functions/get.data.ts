'use server'

import { AdminType } from '@/app/admin/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import { PassThrough } from 'stream';


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '/admin';

export async function AdminGetData(endpoint: string) {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const cookieStore = cookies().get('SESSION_ID');
    const sessionId = cookieStore?.value;

    const data = await fetch(`${backendUrl}/${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionId}`
        }
    }).then(res => res.json());

    if (data.message === "Unauthorized" && data.statusCode === 401) {
        redirect(`/admin/user/login`);
    }

    //console.log("********** Backend Get Data form " + endpoint + " **********", data);

    return data;
}



export async function getData(admin: AdminType) {

    let data;

    const cookieStore = cookies().get('SESSION_ID');
    const sessionId = cookieStore?.value;

    //console.log("**** Cookies ****", sessionId);

    switch (admin.action) {
        case 'list':
            data = await fetch(`${backendUrl}/${admin.modul}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionId}`
                }
            }).then(res => res.json());
            break;

        case 'detail':
            let endpoint = `${backendUrl}/${admin.modul}/${admin.unique}`;

            if (admin.mode) { endpoint += `/${admin.mode}`; }

            data = await fetch(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionId}`
                }
            }).then(res => res.json());
            break;

        case 'dashboard':
            data = await fetch(`${backendUrl}/${admin.modul}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionId}`
                }
            }).then(res => res.json());
            break;

        case 'logout':
            data = await fetch(`${backendUrl}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionId}`
                }
            }).then(res => res.json());
            break;

        case 'room':
            data = await fetch(`${backendUrl}/room`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionId}`
                }
            }).then(res => res.json());
            break;

        // case 'insert':
        //    response = await fetch(`${backendUrl}/${admin.modul}/insert`, { method: "post", body: JSON.stringify(data) }).then(res => res.json());
        //    break;

        // case 'update':
        //    response = await fetch(`${backendUrl}/${admin.modul}/update/${admin.unique}`, { method: "put", body: JSON.stringify(data) }).then(res => res.json());
        //    break;

        // case 'delete':
        //    response = await fetch(`${backendUrl}/${admin.modul}/delete/${admin.unique}`, { method: "delete" }).then(res => res.json());
        //    break;

        // case 'upload':
        //    response = await fetch(`${backendUrl}/image/upload/`, { method: "post", body: JSON.stringify(data) }).then(res => res.json());
        //    break;
    }

    if (data.message === "Unauthorized" && data.statusCode === 401) {
        redirect(`/admin/user/login`);
    }

    //console.log("********** Backend Get Data **********", data);

    return data;
}

export async function getOption(name: string) {

    let option;
    const cookieStore = cookies().get('SESSION_ID');
    const sessionId = cookieStore?.value;

    option = await fetch(`${backendUrl}/options/${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionId}`
        }
    }).then(res => res.json());
    //console.log("********** Backend Get Option **********", option);
    return option;
}





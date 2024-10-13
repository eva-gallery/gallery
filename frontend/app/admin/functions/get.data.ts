'use server'

import { AdminType } from '@/app/admin/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import { PassThrough } from 'stream';


const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '/admin';


export async function getData(admin: AdminType) {

    let data;

    const cookieStore = cookies().get('SESSION_ID');
    const sessionId = cookieStore?.value;

    console.log("**** Cookies ****", sessionId);

    switch (admin.action) {
        case 'list':
            data = await fetch(`${backendUrl}/${admin.module}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionId}`
                }
            }).then(res => res.json());
            break;

        case 'detail':
            let endpoint = `${backendUrl}/${admin.module}/${admin.unique}`;

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
            data = await fetch(`${backendUrl}/${admin.module}`, {
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

        // case 'insert':
        //    response = await fetch(`${backendUrl}/${admin.module}/insert`, { method: "post", body: JSON.stringify(data) }).then(res => res.json());
        //    break;

        // case 'update':
        //    response = await fetch(`${backendUrl}/${admin.module}/update/${admin.unique}`, { method: "put", body: JSON.stringify(data) }).then(res => res.json());
        //    break;

        // case 'delete':
        //    response = await fetch(`${backendUrl}/${admin.module}/delete/${admin.unique}`, { method: "delete" }).then(res => res.json());
        //    break;

        // case 'upload':
        //    response = await fetch(`${backendUrl}/image/upload/`, { method: "post", body: JSON.stringify(data) }).then(res => res.json());
        //    break;
    }

    if (data.message === "Unauthorized" && data.statusCode === 401) {
        redirect(`/admin/user/login`);
    }

    console.log("********** Backend Get Data **********", data);

    return data;
}




export async function setData(formData: FormData, admin: AdminType) {

    console.log("**** adminSetData ****");
    console.log(formData);

    console.log("*** VITKOR ***");
    console.log(admin);


    const json = Object.fromEntries(formData.entries());


    let data;

    switch (admin.action) {
        case 'login':
            data = await fetch(`${backendUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(json)
            }).then(res => res.json());



            if (data.sessionId) {
                cookies().set({
                    name: 'SESSION_ID',
                    value: data.sessionId,
                    secure: true,
                    httpOnly: true,
                    path: '/',
                    sameSite: 'strict'
                });


                redirect(`/admin/${admin.module}`);
            } else {
                data.alert = "Wrong Email or Password!";
            }


            break;
    }

    console.log("********** Backend Set Data **********", data);

    return data;

    //revalidatePath(`/admin/${admin.module}/detail/${admin.unique}`);


}



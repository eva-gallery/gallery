'use server'

import { AdminType } from '@/app/admin/types';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import { PassThrough } from 'stream';


export async function AdminGetData(endpoint: string) {
    // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const backendUrl = 'https://cdn.evagallery.eu/admin';

    const cookieStore = cookies().get('BEARER_TOKEN');
    const bearerToken = cookieStore?.value;

    console.log("**** Cookies ****", bearerToken);

    const data = await fetch(`${backendUrl}/${endpoint}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
        }
    }).then(res => res.json());

    if (data.message === "Unauthorized" && data.statusCode === 401) {
        redirect(`/admin/user/login`);
    }

    //console.log("********** Backend Get Data form " + endpoint + " **********", data);
    return data;
}

export async function AdminPutData(endpoint: string, dataInput?: any) {

    // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const backendUrl = 'https://cdn.evagallery.eu/admin';

    const cookieStore = cookies().get('BEARER_TOKEN');
    const bearerToken = cookieStore?.value;

    const fetchOptions: RequestInit = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
        }
    };

    if (dataInput) {
        fetchOptions.body = JSON.stringify(dataInput);
    }

    const data = await fetch(`${backendUrl}/${endpoint}`, fetchOptions).then(res => {
        return res.json();
    });

    if (data.message === "Unauthorized" && data.statusCode === 401) {
        redirect(`/admin/user/login`);
    }

    //console.log("********** Backend Get Data form " + endpoint + " **********", data);

    return data;
}


export async function AdminPostData(endpoint: string, dataInput?: any) {

    //const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const backendUrl = 'https://cdn.evagallery.eu/admin';

    const cookieStore = cookies().get('BEARER_TOKEN');
    const bearerToken = cookieStore?.value;

    const fetchOptions: RequestInit = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
        }
    };

    if (dataInput) {
        fetchOptions.body = JSON.stringify(dataInput);
    }

    const data = await fetch(`${backendUrl}/${endpoint}`, fetchOptions).then(res => {
        return res.json();
    });

    if (data.message === "Unauthorized" && data.statusCode === 401) {
        redirect(`/admin/user/login`);
    }


    return data;
}


export async function getOption(name: string) {

    // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const backendUrl = 'https://cdn.evagallery.eu/admin';

    let option;
    const cookieStore = cookies().get('BEARER_TOKEN');
    const bearerToken = cookieStore?.value;

    option = await fetch(`${backendUrl}/admin/options/${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${bearerToken}`
        }
    }).then(res => res.json());
    //console.log("********** Backend Get Option **********", option);
    return option;
}


'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import { capitalize } from './tools';
import { M } from '../modules';
import { AdminType } from '../types';
import axios from 'axios';




export async function AdminSetData(admin: AdminType, formData: FormData, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", endpoint: string) {

    axios.defaults.withCredentials = true;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const cookieStore = cookies().get('SESSION_ID');
    const sessionId = cookieStore?.value;
    console.log("**** Cookies ****", sessionId);

    console.log("*** Admin module ****", admin.modul);
    const Module = M[capitalize(admin.modul) as keyof typeof M];


    let type = 'json';
    formData.forEach((value) => {
        if (value instanceof File && value.size > 0) {
            type = 'form';
        }
    });

    console.log("**** Type ****", type);

    let body;
    let headers: { [key: string]: string } = { "Authorization": `Bearer ${sessionId}` };


    const json = await Module.Transform(formData);
    console.log("**** Transform ****", json);


    if (type == 'form') {
        Object.keys(json).forEach((key) => {
            formData.set(key, json[key]);
        });
        body = formData;
    }
    else {
        body = JSON.stringify(json);
        headers = {
            ...headers,
            "Content-Type": "application/json",
        }
    }

    console.log("**** adminSetData ****", body);

    console.log("**** method: endpoint ****", method, endpoint);

    let response = null;
    let error = null;

    try {
        response = await axios({
            method: method,
            url: `${backendUrl}${endpoint}`,
            headers: headers,
            data: body
        });
        console.log("**** Response ****", response);
    }
    catch (err: any) {
        error = err.message || 'Error fetching data. Server down?';

        if (err.response && err.response.status === 401) {
            error = "Wrong Email or Password!";
        }
        if (err.response && err.response.status === 404) {
            error = `Wrong url: ${backendUrl}${endpoint}! Error 404`;
        }
        if (err.response && err.response.status === 500) {
            error = "Backend down! Error 500";
        }

    }

    const data = response?.data;

    console.log("**** Response Data ****", data);
    if (error) {
        return { data: data, error };
    } else {

        console.log("********** Backend Set Data **********", data);

        console.log("**** Admin Action ****", admin.action);

        switch (admin.action) {
            case "list":
                redirect("/admin/" + admin.modul + "/detail/" + data.id);
                break;

            case "edit":
                redirect("/admin/" + admin.modul + "/detail/" + admin.unique);
                break;

            case "delete":
                redirect("/admin/" + admin.modul);
                break;

            case "login":
                if (data.sessionId) {
                    cookies().set({
                        name: 'SESSION_ID',
                        value: data.sessionId,
                        secure: true,
                        httpOnly: true,
                        path: '/',
                        sameSite: 'strict'
                    });
                    redirect("/admin/" + admin.modul);

                } else {
                    return { error: "Wrong Email or Password!" };
                }
                break;
        }
    }

}

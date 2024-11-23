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



    let body;
    let headers: { [key: string]: string } = { "Authorization": `Bearer ${sessionId}` };


    const json = await Module.Transform(formData);
    console.log("**** Transform ****", json);


    let newFormData = new FormData();
    Object.keys(json).forEach((key) => {
        newFormData.set(key, json[key]);
    });
    body = newFormData;


    console.log("**** adminSetData ****", body);

    console.log("**** method FORM: endpoint ****", method, endpoint);

    let response = null;
    let error = null;

    try {
        response = await axios({
            method: method,
            url: `${backendUrl}${endpoint}`,
            headers: headers,
            data: body
        });

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


        }
    }

}


export async function AdminSetDataJson(admin: AdminType, formData: FormData, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", endpoint: string) {

    axios.defaults.withCredentials = true;
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const cookieStore = cookies().get('SESSION_ID');
    const sessionId = cookieStore?.value;
    console.log("**** Cookies ****", sessionId);

    console.log("*** Admin module ****", admin.modul);
    const Module = M[capitalize(admin.modul) as keyof typeof M];



    let body;
    let headers: { [key: string]: string } = { "Authorization": `Bearer ${sessionId}` };


    const json = await Module.Transform(formData);
    console.log("**** Transform ****", json);


    body = JSON.stringify(json);
    headers = {
        ...headers,
        "Content-Type": "application/json",
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

    if (error) {
        return { data: data, error };
    } else {

        console.log("********** Backend Set Data **********", data);

        console.log("**** Admin Action ****", admin.action);

        switch (admin.action) {

            case "login":
                const cookie = response?.headers?.['set-cookie']?.find(cookie => cookie.startsWith('SESSION_ID='));
                if (cookie) {

                    const getCookieValue = (cookieString: string, cookieName: string) => {
                        const cookies = cookieString.split('; ');
                        const targetCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
                        return targetCookie ? targetCookie.split('=')[1] : null;
                    };

                    // Extrahujte iba hodnotu SESSION_ID
                    const sessionId = getCookieValue(cookie, 'SESSION_ID');

                    console.log("**** Session ID ****", sessionId);
                    if (sessionId) {
                        cookies().set({
                            name: 'SESSION_ID',
                            value: decodeURIComponent(sessionId),
                            secure: true,
                            httpOnly: true,
                            path: '/',
                            sameSite: 'strict'
                        });
                    } else {
                        return { error: "Session ID is null!" };
                    }
                    redirect("/admin");

                } else {
                    return { error: "Wrong Email or Password!" };
                }
                break;
        }
    }

}

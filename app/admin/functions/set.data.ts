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
    const backendUrl = process.env.NEXT_INTERNAL_BACKEND_URL;

    const cookieStore = cookies().get('BEARER_TOKEN');
    const bearerToken = cookieStore?.value;
    console.log("**** bearerToken ****", bearerToken);

    console.log("*** Admin module ****", admin.modul);

    let modul = admin.modul;
    if (admin.modul == "resource") {
        modul = "designer";
    }
    const Module = M[capitalize(modul) as keyof typeof M];


    let body;
    let headers: { [key: string]: string } = { "Authorization": `Bearer ${bearerToken}` };


    const newFormData = await Module.Transform(formData);
    console.log("**** Transform ****", newFormData);


    /*let newFormData = new FormData();
    Object.keys(json).forEach((key) => {
        newFormData.set(key, json[key]);
    });*/


    body = newFormData;


    console.log("**** adminSetData ****", body);

    console.log("**** method FORM: endpoint ****", backendUrl, method, endpoint);

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
        console.log("**** Error ****", err.response.data);
        error = err.response.data.message || 'Error fetching data.';

        if (err.response && err.response.status === 401) {
            error = "Wrong Email or Password!";
        }
        if (err.response && err.response.status === 404) {
            error = `Wrong url: ${backendUrl}${endpoint}! Error 404`;
        }
        if (err.response && err.response.status === 500) {
            error = "Error 500";
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
                redirect("/admin/" + modul + "/detail/" + data.id);
                break;

            case "edit":
                if (admin.modul == "resource") {

                } else {
                    redirect("/admin/" + modul + "/detail/" + admin.unique);
                }
                break;

            case "delete":
                redirect("/admin/" + modul);
                break;



            case "create":
                const cookie = response?.headers?.['set-cookie']?.find(cookie => cookie.startsWith('BEARER_TOKEN='));
                if (cookie) {

                    const getCookieValue = (cookieString: string, cookieName: string) => {
                        const cookies = cookieString.split('; ');
                        const targetCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
                        return targetCookie ? targetCookie.split('=')[1] : null;
                    };

                    // Extrahujte iba hodnotu BEARER_TOKEN
                    const bearerToken = getCookieValue(cookie, 'BEARER_TOKEN');

                    console.log("**** Session ID ****", bearerToken);
                    if (bearerToken) {
                        cookies().set({
                            name: 'BEARER_TOKEN',
                            value: decodeURIComponent(bearerToken),
                            secure: false,
                            httpOnly: false,
                            path: '/',
                            //domain: 'cdn.evagallery.eu', // Rovnaká doména ako na produkcii
                        });
                    } else {
                        return { error: "Session ID is null!" };
                    }
                } else {
                    return { error: "No cookie" };
                }
                redirect("/admin");
                break;

        }
    }

}


export async function AdminSetDataJson(admin: AdminType, formData: FormData, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", endpoint: string) {

    axios.defaults.withCredentials = true;

    const backendUrl = process.env.NEXT_INTERNAL_BACKEND_URL;

    const cookieStore = cookies().get('BEARER_TOKEN');
    const bearerToken = cookieStore?.value;
    console.log("**** Cookies ****", bearerToken);

    console.log("*** Admin module ****", admin.modul);
    const Module = M[capitalize(admin.modul) as keyof typeof M];



    let body;
    let headers: { [key: string]: string } = { "Authorization": `Bearer ${bearerToken}` };


    const json = await Module.Transform(formData);
    console.log("**** Transform ****", json);


    body = JSON.stringify(json);
    headers = {
        ...headers,
        "Content-Type": "application/json",
    }

    console.log("**** adminSetData JSON ****", body);

    console.log("**** method: endpoint ****",backendUrl, method, endpoint);

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
        console.log("**** Error ****", err.response?.data.message);
        error = err.response?.data.message || 'Error fetching data.';

        if (err.response && err.response.status === 401) {
            error = "Wrong Email or Password!";
        }
        if (err.response && err.response.status === 404) {
            error = `Wrong url: ${backendUrl}${endpoint}! Error 404`;
            error = err.response.data.message;
        }
        if (err.response && err.response.status === 500) {
            error = "Error 500";
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
                const cookie = response?.headers?.['set-cookie']?.find(cookie => cookie.startsWith('BEARER_TOKEN='));
                if (cookie) {

                    const getCookieValue = (cookieString: string, cookieName: string) => {
                        const cookies = cookieString.split('; ');
                        const targetCookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
                        return targetCookie ? targetCookie.split('=')[1] : null;
                    };

                    // Extrahujte iba hodnotu BEARER_TOKEN
                    const bearerToken = getCookieValue(cookie, 'BEARER_TOKEN');

                    console.log("**** Session ID ****", bearerToken);
                    if (bearerToken) {
                        cookies().set({
                            name: 'BEARER_TOKEN',
                            value: decodeURIComponent(bearerToken),
                            secure: false,
                            httpOnly: false,
                            path: '/',
                            //domain: 'cdn.evagallery.eu', // Rovnaká doména ako na produkcii
                        });
                    } else {
                        return { error: "Session ID is null!" };
                    }
                    redirect("/admin");

                } else {
                    return { error: "Wrong Email or Password!" };
                }
                break;
            case "register":
            case "reset":
                return { error: "Check your email!" };
                break;
            case "newpassword":
                console.log("**** New Password ****");
                redirect("/admin/user/login");
                break;

        }
    }

}

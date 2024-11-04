'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import { capitalize } from './tools';
import { M } from '../modules';
import { AdminType } from '../types';




export async function AdminSetData(admin: AdminType, formData: FormData, method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE", endpoint: string) {

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

    const data = await fetch(`${backendUrl}${endpoint}`, {
        method: method,
        headers: headers,
        body: body

    }).then(async (res) => {
        const text = await res.text();

        try {
            return text ? JSON.parse(text) : {};
        } catch (error) {
            console.error("Invalid JSON response:", error);
            return {};
        }
    });

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

            } else {
                data.alert = "Wrong Email or Password!";
            }
            redirect("/admin/" + admin.modul);
            break;
    }


}

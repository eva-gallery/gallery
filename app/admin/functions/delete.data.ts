'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
import { PassThrough } from 'stream';
import { capitalize } from './tools';
import { M } from '../modules';
import { AdminType } from '../types';
import Gallery from '../modules/gallery/gallery';




export async function AdminDeleteData(admin: AdminType, endpoint: string) {

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const cookieStore = cookies().get('SESSION_ID');
    const sessionId = cookieStore?.value;

    console.log("**** Cookies ****", sessionId);




    const data = await fetch(`${backendUrl}${endpoint}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionId}`
        }
    }).then(async (res) => {
        // Skontroluj, či odpoveď obsahuje nejaké telo
        const text = await res.text(); // Prečítaj odpoveď ako text

        try {
            return text ? JSON.parse(text) : {}; // Pokus o parsovanie JSON, ak text existuje
        } catch (error) {
            console.error("Invalid JSON response:", error);
            return {}; // Vráť prázdny objekt, ak parsovanie zlyhá
        }
    });


    console.log("********** Backend Set Data **********", data);

    let modul = admin.modul;
    if (admin.modul == "resource") {
        modul = "designer";
    }
    redirect("/admin/" + modul);


}





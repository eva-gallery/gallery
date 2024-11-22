'use server'

import axios from 'axios';

export async function getData(endpoint: string) {

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

        const headers = {
            "Content-Type": "application/json",
        }
        
       
        let response = null;
        let error = null;


        try {
            response = await axios({
                method: "GET",
                url: `${backendUrl}${endpoint}`,
                headers: headers,
            });
        }
        catch (err: any) {
            error = err.message || 'Error fetching data. Server down?';
            
        }    
        
        if (error){
            console.log(error);
            return (error);
        }
        else {
            const data=response?.data;
            console.log("data:",data);
            return(data)
        }
        
}

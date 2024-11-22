'use server'

import axios, { AxiosError } from 'axios';

// You might want to create a type for the common response structure
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
}

export async function getData<T>(endpoint: string): Promise<T> {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!backendUrl) {
        throw new Error('Backend URL is not configured');
    }

    const headers = {
        "Content-Type": "application/json",
    }
    
    try {
        const response = await axios<T>({
            method: "GET",
            url: `${backendUrl}${endpoint}`,
            headers: headers,
        });

        return response.data;
    }
    catch (err) {
        // Type guard for axios error
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;
            console.error('API Error:', {
                message: axiosError.message,
                status: axiosError.response?.status,
                statusText: axiosError.response?.statusText,
                url: `${backendUrl}${endpoint}`
            });
            
            // You might want to throw the error instead of returning it
            // so it can be caught by error boundaries
            throw new Error(axiosError.message || 'Error fetching data');
        }

        // For non-axios errors
        console.error('Non-API Error:', err);
        throw new Error('An unexpected error occurred');
    }
}
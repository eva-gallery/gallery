'use server'
import React from 'react';
import { Container } from 'react-bootstrap';
import { AdminType } from '../types';
import { capitalize } from '../functions/tools';
import { M } from '../modules';
import { notFound } from 'next/navigation';

export default async function Page({ params }: any) {
    // Check if params.url exists
    if (!params?.url || !Array.isArray(params.url) || params.url.length === 0) {
        notFound();
    }

    const admin: AdminType = {
        modul: params.url[0] || '',  // Provide default values
        action: params.url[1] || '',
        unique: params.url[2] || '',
        mode: params.url[3] || ''
    };

    // Check if module exists before trying to use it
    const moduleName = capitalize(admin.modul);
    if (!M[moduleName as keyof typeof M]) {
        return (
            <Container className='py-5'>
                <div>Unknown module: {moduleName}</div>
            </Container>
        );
    }

    const Modul = M[moduleName as keyof typeof M];

    try {
        return (
            <Container className='py-5'>
                {Modul(admin)}
            </Container>
        );
    } catch (error) {
        console.error('Error rendering module:', error);
        return (
            <Container className='py-5'>
                <div>Error loading module: {moduleName}</div>
            </Container>
        );
    }
}

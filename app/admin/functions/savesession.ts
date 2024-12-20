'use server';

import { cookies } from 'next/headers';

const SaveSession = async ({ bearerToken }: { bearerToken: string }) => {

    console.log("**** Save Session ****", bearerToken);

    cookies().set({
        name: 'BEARER_TOKEN',
        value: decodeURIComponent(bearerToken),
        secure: true,
        httpOnly: true,
        path: '/',
    });
};

export default SaveSession;

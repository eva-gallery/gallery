

import React from 'react';
import { AdminType } from '../../types';
import { Button } from 'react-bootstrap';



export async function Failure(admin: AdminType) {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


	return (
		<>

			<p className='text-center'>
				<strong>The login attempt via Google was unsuccessful. </strong><br />
				Please check your credentials or connection and try logging in again.</p>
			<p className='text-center'>
				<Button as="a" href={`${backendUrl}/admin/google/login?redirect_url=/admin`} variant="light" className='mt-5 border'>
					<img src="/images/logo/google_logo.svg" className='me-2' />
					Login with Google
				</Button>
			</p>
		</>


	);
}

export default Failure;
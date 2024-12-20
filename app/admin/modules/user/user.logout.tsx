

import React from 'react';

import { AdminType } from '@/app/admin/types';
import { AdminSetDataJson } from '../../functions/set.data';



export async function Logout(admin: AdminType) {

	const data = await AdminSetDataJson(admin, new FormData(), "POST", "/admin/logout");
	console.log("**** Logout ****", data);

	return (
		<>

			<p className='text-center'>
				You were logged out.
			</p>
			<p className='text-center'>
				<a href="/" className='btn btn-primary'>
					Go to Public webpage
				</a>
			</p >

		</>


	);
}

export default Logout;
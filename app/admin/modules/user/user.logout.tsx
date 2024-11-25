

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

		</>


	);
}

export default Logout;


import React from 'react';

import { AdminType } from '@/app/admin/types';



export async function Logout(admin: AdminType) {



	return (
		<>

			<p className='text-center'>
				You were logged out.
			</p>

		</>


	);
}

export default Logout;


import React from 'react';
import Image from 'next/image';


import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';
import { getData } from '../../functions/get.data';



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
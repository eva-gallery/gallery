

import React from 'react';
import Image from 'next/image';


import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';
import { getData } from '../../functions/get.data';



export async function Login(admin: AdminType) {

	/*const data = getData(admin);

	console.log("********** Login **********", data);
	*/

	return (
		<>

			<A.Login admin={admin} />

		</>


	);
}

export default Login;
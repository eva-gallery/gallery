

import React from 'react';
import AdminLogin from '../../components/login';
import { AdminType } from '../../types';



export async function Login(admin: AdminType) {



	return (
		<>

			<AdminLogin admin={admin} />

		</>


	);
}

export default Login;
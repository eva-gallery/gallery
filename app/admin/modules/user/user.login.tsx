

import React from 'react';
import { AdminType } from '../../types';
import AdminUserLoginForm from './user.loginform';



export async function Login(admin: AdminType) {



	return (
		<>

			<AdminUserLoginForm admin={admin} />

		</>


	);
}

export default Login;
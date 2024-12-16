

import React from 'react';
import { AdminType } from '../../types';
import AdminUserNewPasswordForm from './user.newpasswordform';



export async function Newpassword(admin: AdminType) {



	return (
		<>

			<AdminUserNewPasswordForm admin={admin} />

		</>


	);
}

export default Newpassword;


import React from 'react';
import { AdminType } from '../../types';
import AdminUserResetForm from './user.resetform';



export async function Reset(admin: AdminType) {



	return (
		<>

			<AdminUserResetForm admin={admin} />

		</>


	);
}

export default Reset;
'use server'

import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AdminType } from '../../types';
import { AdminGetData } from '../../functions/get.data';
import AdminDetail from '../../components/detail';
import { AdminEmail, AdminHtml } from '../../components/components';
import AdminImage from '../../components/image';



export async function Detail(admin: AdminType) {


	const data = await AdminGetData("admin/user");

	const object = {
		data
	}

	return (
		<>
			<AdminDetail admin={admin} object={object}>


				<AdminDetail.Row icon="user" name="Name">
					<strong className='fs-3'>
						{data['name']}
					</strong>
				</AdminDetail.Row>

				<AdminDetail.Row icon="textarea" name="Description">
					<AdminHtml html={data['description']} />
				</AdminDetail.Row>

				<AdminDetail.Row icon="user" name="Avatar">
					<AdminImage src="user/avatar" width={300} height={300} alt="avatar" className='img-thumbnail rounded-circle border' />
				</AdminDetail.Row>

				<AdminDetail.Row icon="email" name="Email">
					<AdminEmail email={data['email']} />
				</AdminDetail.Row>


			</AdminDetail>

			<hr />
			<p className='text-center'>
				<Button as='a' href='/admin/user/logout' variant='primary'>
					<FontAwesomeIcon icon={faArrowRight} className='me-2' />
					Logout
				</Button>
			</p>
		</>


	);
}

export default Detail;
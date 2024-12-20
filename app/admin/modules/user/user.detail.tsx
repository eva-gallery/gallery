'use server'

import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AdminType } from '../../types';
import { AdminGetData } from '../../functions/get.data';
import AdminDetail from '../../components/detail';
import { AdminEmail, AdminHtml, AdminIcon } from '../../components/components';
import { AdminImageCheck } from '../../components/image';
import AdminEdit from '../../components/edit';

import AdminUserFormular, { FormularPassword } from './user.formular';
import UserEdit from './user.edit';
import AdminUserEdit from './user.edit';
import AdminUserPassword from './user.password';



export async function Detail(admin: AdminType) {


	const data = await AdminGetData("admin/user");

	const object = {
		data
	}


	return (
		<>
			<h1 className='mb-3'>
				<AdminIcon name="user" size={48} className='me-3' />
				User
			</h1>

			<hr />

			<AdminDetail.Row icon="user" name="Name">
				<strong className='fs-3'>
					{data['name']}
				</strong>
			</AdminDetail.Row>

			<AdminDetail.Row icon="textarea" name="Description">
				<AdminHtml html={data['description']} />
			</AdminDetail.Row>

			<AdminDetail.Row icon="user" name="Avatar">
				<AdminImageCheck src="user/avatar" width={300} height={300} alt="avatar" className='img-thumbnail rounded-circle border' />
			</AdminDetail.Row>

			<AdminDetail.Row icon="email" name="Email">
				<AdminEmail email={data['email']} />
			</AdminDetail.Row>


			<Row className='mb-5'>
				<Col className='col-md-3 py-2' />
				<Col className='py-2'>

					<AdminUserEdit admin={admin}>
						<AdminUserFormular data={object.data} />
					</AdminUserEdit>

					<AdminUserPassword admin={admin}>
						<FormularPassword data={object.data} />
					</AdminUserPassword>

					<Button as='a' href='/admin/user/logout' variant='primary' className='ms-2'>
						<FontAwesomeIcon icon={faArrowRight} className='me-2' />
						Logout
					</Button>

				</Col>
			</Row>

		</>


	);
}

export default Detail;
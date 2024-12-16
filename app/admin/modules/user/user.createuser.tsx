'use server';

import React from 'react';
import { AdminType } from '../../types';
import Formular, { FormularCreateUser } from './user.formular';
import { AdminIcon } from '../../components/components';
import { AdminForm } from '../../components/form';
import { Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { redirect } from 'next/navigation';


export async function CreateUser(admin: AdminType) {



	return (
		<>

			<h1 className='mb-3'>
				<AdminIcon name="user" size={48} className='me-3' />
				Create User
			</h1>

			<hr />
			<p className='mb-5'>
				Welcome to EVA GALLERY. Please fill your information to create an account.
			</p>

			<AdminForm method="POST" type="FORMDATA" endpoint="/admin/user/create" admin={{ modul: "user", action: "create" }} >
				<FormularCreateUser />
				<Row className='justify-content-center'>
					<Col xs={2}>
					</Col>
					<Col xs={4}>
						<Button variant="primary" type="submit">
							Create
							<FontAwesomeIcon icon={faArrowRight} fixedWidth className='ms-2' />
						</Button>
					</Col>
				</Row>
			</AdminForm >
		</>


	);
}

export default CreateUser;
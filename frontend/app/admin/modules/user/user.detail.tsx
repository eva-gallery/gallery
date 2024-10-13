'use server'

import React from 'react';
import Image from 'next/image';


import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';


export async function Detail(admin: AdminType) {

	admin.action = 'list';
	const object = await A.getData(admin);

	return (
		<>
			<A.Detail admin={admin} data={object}>


				<A.Detail.Row icon="user" name="Name">
					<strong className='fs-3'>
						{object['name']}
					</strong>
				</A.Detail.Row>

				<A.Detail.Row icon="textarea" name="Description">
					<A.Html html={object['description']} />
				</A.Detail.Row>

				<A.Detail.Row icon="user" name="Avatar">
					<A.Image src="user/avatar" width={300} height={300} alt="avatar" className='img-thumbnail rounded-circle border' />
				</A.Detail.Row>

				<A.Detail.Row icon="email" name="Email">
					<A.Email email={object['email']} />
				</A.Detail.Row>


			</A.Detail>

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
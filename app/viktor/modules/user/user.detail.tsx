'use server'

import React from 'react';
import Image from 'next/image';


import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';
import { F } from '@/app/framework';


export async function Detail(viktor: ViktorType) {

	let object = new F.objectX("user");
	await object.getData(1);
	await object.getParents();

	return (
		<>
			<V.Detail viktor={viktor} data={object}>
				<V.Detail.Row icon="label" name="Label">
					{object.data['label']}
				</V.Detail.Row>

				<V.Detail.Row icon="user" name="Name">
					<strong className='fs-3'>
						{object.data['name']}
					</strong>
				</V.Detail.Row>

				<V.Detail.Row icon="textarea" name="Description">
					<V.Html html={object.data['description']} />
				</V.Detail.Row>

				<V.Detail.Row icon="user" name="Avatar">
					<Image src={`/users/${object.data['avatar']}`} width={300} height={300} alt="avatar" className='img-thumbnail rounded-circle border' />
				</V.Detail.Row>

				<V.Detail.Row icon="email" name="Email">
					<V.Email email={object.data['email']} />
				</V.Detail.Row>

				<V.Detail.Row icon="password" name="Password">
					{object.data['password']}
				</V.Detail.Row>
			</V.Detail>

		</>


	);
}

export default Detail;
'use server'

import React from 'react';

import { Detail } from './artist.detail';
import { List } from './artist.list';
import Table from './artist.table';
import Formular from './artist.formular';

import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';
import { icon } from '@fortawesome/fontawesome-svg-core';


async function Artist(admin: AdminType) {

	return (
		<A.Action admin={admin} actions={Data.actions} />
	);
};



const Data = {
	actions: ["list", "detail"],
	icon: "artist",
	name: "Artist",
};




Artist.Detail = Detail;
Artist.List = List;
Artist.Table = Table;
Artist.Formular = Formular;
Artist.Data = Data;

export default Artist;



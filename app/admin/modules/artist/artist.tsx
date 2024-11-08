'use server'

import React from 'react';

import { Detail } from './artist.detail';
import { List } from './artist.list';
import Table from './artist.table';
import Formular from './artist.formular';
import AdminAction from '../../components/action';
import { AdminType } from '../../types';
import { Transform } from './artist.functions';


async function Artist(admin: AdminType) {

	return (
		<AdminAction admin={admin} actions={Data.actions} />
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
Artist.Transform = Transform;

export default Artist;



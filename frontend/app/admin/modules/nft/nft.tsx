'use server'

import React from 'react';

//import { Detail } from './nft.detail';
import { List } from './nft.list'
import Cards from './nft.cards';
// import Formular from './nft.formular';

import AdminAction from '../../components/action';
import { AdminType } from '../../types';



async function Nft(admin: AdminType) {

    return (
        <AdminAction admin={admin} actions={Data.actions} />
    );
};


const Data = {
    actions: ["list", "detail"],
    icon: "nft",
    name: "NFT",
};


Nft.Data = Data;
//Nft.Detail = Detail;
Nft.List = List;
Nft.Cards = Cards;
// Nft.Formular = Formular;

export default Nft;
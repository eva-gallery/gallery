'use server'

import React from 'react';

import { Detail } from './artist.detail';
import { List } from './artist.list';
import Table from './artist.table';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';


async function Artist(viktor: ViktorType) {

  const actions = ["list", "detail"];

  return (
    <V.Action viktor={viktor} actions={actions} />
  );
};

Artist.Detail = Detail;
Artist.List = List;
Artist.Table = Table;


export default Artist;



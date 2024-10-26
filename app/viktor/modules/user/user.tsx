'use server'

import React from 'react';

import { Detail } from './user.detail';
import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';



async function User(viktor: ViktorType) {

  const actions = ["detail"];

  return (
    <V.Action viktor={viktor} actions={actions} />
  );
};

User.Detail = Detail;

export default User;
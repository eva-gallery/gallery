'use server'

import React from 'react';

import { Detail } from './user.detail';
import { Login } from './user.login';
import { Logout } from './user.logout';

import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';


const actions = ["detail", "login", "logout"];

const Data = {
  actions: actions,
  icon: "user",
  name: "User",
};

async function User(admin: AdminType) {



  return (
    <A.Action admin={admin} actions={actions} />
  );
};

User.Detail = Detail;
User.Login = Login;
User.Logout = Logout;
User.Data = Data;

export default User;
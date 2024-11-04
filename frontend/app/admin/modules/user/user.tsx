'use server'

import React from 'react';

import { Detail } from './user.detail';
import { Login } from './user.login';
import { Logout } from './user.logout';
import { AdminType } from '../../types';
import AdminAction from '../../components/action';
import { Transform } from './user.functions';
import { Formular } from './user.formular';

const actions = ["detail", "login", "logout"];

const Data = {
  actions: actions,
  icon: "user",
  name: "User",
};

async function User(admin: AdminType) {



  return (
    <AdminAction admin={admin} actions={actions} />
  );
};

User.Detail = Detail;
User.Login = Login;
User.Logout = Logout;
User.Data = Data;
User.Transform = Transform;
User.Formular = Formular;

export default User;
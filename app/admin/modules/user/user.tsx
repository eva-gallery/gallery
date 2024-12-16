'use server'

import React from 'react';

import { Detail } from './user.detail';
import { Login } from './user.login';
import { Logout } from './user.logout';
import { Reset } from './user.reset';
import { AdminType } from '../../types';
import AdminAction from '../../components/action';
import { Transform } from './user.functions';
import Formular from './user.formular';
import CreateUser from './user.createuser';
import Failure from './user.failure';
import RegisterUser from './user.registeruser';
import Newpassword from './user.newpassword';

const actions = ["detail", "login", "logout", "reset", "create", "register", "reset", "newpassword", "failure"];

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
User.Reset = Reset;
User.Data = Data;
User.Transform = Transform;
User.Formular = Formular;
User.Create = CreateUser;
User.Register = RegisterUser;
User.Reset = Reset;
User.Failure = Failure;
User.Newpassword = Newpassword;

export default User;
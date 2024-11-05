'use client'

import React from 'react';
import { AdminFormInput } from '../../components/form';
import { ModuleFormular } from '../../types';


export const Formular: React.FC<ModuleFormular> = ({ data, option }) => {

   return (
      <>
         <AdminFormInput type="tinytext" icon="artist" label="Name" name="name" value={data['name']} required />
         <AdminFormInput type="longtext" icon="textarea" label="Description" name="description" value={data['description']} />
         <AdminFormInput type="image" icon="user" label="Avatar" name="avatar" value={data['id']} />
         <AdminFormInput type="tinytext" icon="email" label="Email" name="email" value={data['email']} />
      </>
   );
}

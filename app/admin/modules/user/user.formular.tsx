'use client'

import React from 'react';
import { AdminFormInput } from '../../components/form';
import { ModuleFormular } from '../../types';
import { useSearchParams } from 'next/navigation';
import { AdminFormControl } from '../../components/formcontrol';


const Formular: React.FC<ModuleFormular> = ({ data, option }) => {

   return (
      <>
         <AdminFormInput type="tinytext" icon="artist" label="Name" name="name" value={data['name']} required />
         <AdminFormInput type="longtext" icon="textarea" label="Description" name="description" value={data['description']} />
         <AdminFormInput type="image" icon="user" label="Avatar" name="avatar" value={data['id']} />
      </>
   );
}

export const FormularPassword: React.FC<ModuleFormular> = ({ data, option }) => {

   return (
      <>
         <AdminFormInput type="password" icon="password" label="Old Password" name="oldPassword" value={null} required />
         <AdminFormInput type="password" icon="password" label="New Password" name="newPassword" value={null} required />
         <small>New Password must have minimun length 8 characters, 1 uppercase and 1 lowercase character, 1 number an 1 symbol.
         </small>
      </>
   );
}



export const FormularCreateUser: React.FC = () => {

   const searchParams = useSearchParams();
   const name = searchParams.get('name') || '';
   const token = searchParams.get('token') || '';
   const loginType = searchParams.get('loginType') || '';


   return (
      <>
         <AdminFormInput type="tinytext" icon="artist" label="Name" name="name" value={name} required />
         <AdminFormInput type="longtext" icon="textarea" label="Description" name="description" value={null} />
         <AdminFormInput type="image" icon="user" label="Avatar" name="avatar" value={null} />
         <AdminFormControl type="hidden" name="token" value={token} option={[]} />
         <AdminFormControl type="hidden" name="loginType" value={loginType} option={[]} />
         {loginType === 'credentials' &&
            <>
               <AdminFormInput type="password" icon="password" label="Password" name="password" value={null} required />
               <small>New Password must have minimun length 8 characters, 1 uppercase and 1 lowercase character, 1 number an 1 symbol.
               </small>
            </>
         }
      </>
   );
}

export const FormularRegisterUser: React.FC = () => {
   return (
      <>
         <AdminFormInput type="tinytext" icon="email" label="Email" name="email" value={null} required />
      </>
   );
}

export const FormularResetPassword: React.FC<ModuleFormular> = ({ data, option }) => {

   return (
      <>
         <AdminFormInput type="password" icon="password" label="New Password" name="newPassword" value={null} required />
         <small>
            New Password must have minimun length 8 characters, 1 uppercase and 1 lowercase character, 1 number an 1 symbol.
         </small>
      </>
   );
}

export const FormularNewPassword: React.FC = () => {
   const searchParams = useSearchParams();
   const token = searchParams.get('token') || '';
   return (
      <>
         <AdminFormInput type="password" icon="password" label="Password" name="password" value={null} required />
         <AdminFormControl type="hidden" name="token" value={token} option={[]} />
      </>
   );
}

export default Formular;

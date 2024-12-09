'use client'

import React from 'react';
import { AdminFormInput } from '../../components/form';
import { ModuleFormular } from '../../types';


export const Formular: React.FC<ModuleFormular> = ({ data, option }) => {

   return (
      <>
         <AdminFormInput type="tinytext" icon="artist" label="Name" name="name" value={data['name']} required />
         <AdminFormInput type="longtext" icon="textarea" label="Description" name="description" value={data['description']} />
         <AdminFormInput type="longtext" icon="address" label="Address" name="address" value={data['address']} />
         <AdminFormInput type="parent" icon="globe" label="Country" name="countryId" value={data['country']?.["id"] ?? ''} option={option?.['country']} required />
         <AdminFormInput type="image" icon="photo" label="Image" name="image" value={data['id']} />
         <AdminFormInput type="boolean" icon="question" label="Public" name="public" value={data['public']} />
      </>
   );
}


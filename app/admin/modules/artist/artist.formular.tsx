'use client'

import React from 'react';
import { AdminFormInput } from '../../components/form';
import { ModuleFormular } from '../../types';


const Formular: React.FC<ModuleFormular> = ({ data, option }) => {


   return (
      <>
         <AdminFormInput type="tinytext" icon="artist" label="Name" name="name" value={data['name']} required />
         <AdminFormInput type="date" icon="date" label="Born" name="born" value={data['born']} required />
         <AdminFormInput type="longtext" icon="textarea" label="Biography" name="biography" value={data['biography']} />
         <AdminFormInput type="parent" icon="globe" label="Country" name="countryId" value={data['country']?.["id"] ?? ''} option={option?.['country']} required />
         <AdminFormInput type="parent" icon="category" label="Category" name="artistCategoryId" value={data['artistCategory']?.["id"] ?? ''} option={option?.['artist_category']} required />
         <AdminFormInput type="boolean" icon="question" label="Public" name="public" value={data['public']} />

      </>
   );
}

export default Formular;

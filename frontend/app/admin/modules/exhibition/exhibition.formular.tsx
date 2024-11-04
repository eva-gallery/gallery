'use client'

import React from 'react';
import { AdminFormInput } from '../../components/form';
import { ModuleFormular } from '../../types';


const Formular: React.FC<ModuleFormular> = ({ data, option }) => {


   return (
      <>
         <AdminFormInput type="tinytext" icon="exhibition" label="Name" name="name" value={data['name']} required />
         <AdminFormInput type="date" icon="date" label="Date since" name="fromDate" value={data['fromDate']} required />
         <AdminFormInput type="date" icon="date" label="Date to" name="toDate" value={data['toDate']} required />
         <AdminFormInput type="tinytext" icon="client" label="Curator" name="curator" value={data['curator']} />
         <AdminFormInput type="parent" icon="gallery" label="Gallery" name="galleryId" value={data['gallery']?.["id"] ?? ''} option={option?.['gallery']} required />
         <AdminFormInput type="boolean" icon="question" label="Public" name="public" value={data['public']} />
      </>
   );
}

export default Formular;

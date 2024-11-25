'use client'

import React from 'react';
import { AdminFormInput } from '../../components/form';
import { ModuleFormular } from '../../types';


export const Formular: React.FC<ModuleFormular> = ({ data, option }) => {


   return (
      <>
         <AdminFormInput type="tinytext" icon="exhibition" label="Name" name="name" value={data['name']} required />
         <AdminFormInput type="date" icon="date" label="Date since" name="fromDate" value={data['fromDate']} />
         <AdminFormInput type="date" icon="date" label="Date to" name="toDate" value={data['toDate']} />
         <AdminFormInput type="tinytext" icon="client" label="Curator" name="curator" value={data['curator']} />
         <AdminFormInput type="parent" icon="gallery" label="Gallery" name="galleryId" value={data['gallery']?.["id"] ?? ''} option={option?.['gallery']} />
         <AdminFormInput type="boolean" icon="question" label="Public" name="public" value={data['public']} />
      </>
   );
}

export const FormularArtwork: React.FC<ModuleFormular> = ({ data, option }) => {

   return (
      <>
         <AdminFormInput type="parent" icon="artwork" label="Artwork" name="name" value={data['name']} option={option?.['artwork']} required />
      </>
   );
}

// doplnim neskor.
// export const FormularDesigner: React.FC<ModuleFormular> = ({ data, option }) => {

//    return (
//       <>
//          <AdminFormInput type="tinytext" icon="designer" label="Name" name="name" value={data['name']} required />
//       </>
//    );
// }

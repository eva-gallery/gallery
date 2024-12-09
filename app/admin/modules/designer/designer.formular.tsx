'use client'

import React from 'react';
import { AdminFormInput } from '../../components/form';
import { ModuleFormular } from '../../types';


const Formular: React.FC<ModuleFormular> = ({ data, option }) => {


   return (
      <>
         <AdminFormInput type="tinytext" icon="designer" label="Name" name="name" value={data['name']} required />
         <AdminFormInput type="parent" icon="exhibition" label="Exhibition" name="exhibitionId" value={data['exhibition']?.["id"] ?? ''} option={option?.['exhibition']} required />
         <AdminFormInput type="resourceimage" icon="environment" label="Environment Image" name="environmentImageId" value={data['environmentImageId']} />
         <AdminFormInput type="resourceaudio" icon="audio" label="Background Music" name="backgroundMusicId" value={data['backgroundMusicId']} />
      </>
   );
}

export const FormularResources: React.FC<ModuleFormular> = ({ data, option }) => {


   return (
      <>
         <AdminFormInput type="tinytext" icon="text" label="Name" name="name" value={data['name']} required />
         {
            data['mimeType'] === 'audio/mpeg' ? (
               <AdminFormInput type="resourceaudio" icon="audio" label="Background Audio" name="data" value={data['id']} />
            ) : data['mimeType'] === 'image/jpeg' ? (
               <AdminFormInput type="resourceimage" icon="image" label="Enviroment Image" name="data" value={data['id']} />
            ) : <AdminFormInput type="resource" icon="resource" label="Resource" name="data" value={null} required />
         }

      </>
   );
}

export default Formular;

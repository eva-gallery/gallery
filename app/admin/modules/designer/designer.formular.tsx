'use client'

import React from 'react';
import { AdminFormInput } from '../../components/form';
import { ModuleFormular } from '../../types';


const Formular: React.FC<ModuleFormular> = ({ data, option }) => {
   console.log("data", data);
   return (
      <>
         <AdminFormInput type="tinytext" icon="designer" label="Name" name="name" value={data['name']} required />
         <AdminFormInput type="parent" icon="exhibition" label="Exhibition" name="exhibitionId" value={data['exhibition']?.["id"] ?? ''} option={option?.['exhibition']} required />
         <AdminFormInput type="int" icon="number" label="Radius (m)" name="width" value={data['width']} required />
         <AdminFormInput type="parent" icon="audio" label="Background Audio" name="backgroundMusicId" value={data['backgroundMusicId']} option={option?.['resourceAudio']} />
         <AdminFormInput type="parent" icon="image" label="Environment Image" name="environmentImageId" value={data['environmentImageId']} option={option?.['resourceImage']} />

         <input type="hidden" name="id" value={data['id'] || crypto.randomUUID()} />

         <input type="hidden" name="x" value={data['x']} />
         <input type="hidden" name="y" value={data['y']} />

         <input type="hidden" name="length" value={Array.isArray(data) ? 0.8 : data['length']} />
         <input type="hidden" name="height" value={data['height'] ?? 1} />

         <input type="hidden" name="items" value={JSON.stringify(data['items'])} />
         <input type="hidden" name="lamps" value={JSON.stringify(data['lamps'])} />
         <input type="hidden" name="walls" value={JSON.stringify(data['walls'])} />

         {/* <AdminFormInput type="resourceimage" icon="environment" label="Environment Image" name="environmentImageId" value={data['environmentImageId']} />
         <AdminFormInput type="resourceaudio" icon="audio" label="Background Music" name="backgroundMusicId" value={data['backgroundMusicId']} /> */}
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

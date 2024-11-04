'use client'

import React from 'react';
import { AdminFormInput } from '../../components/form';
import { ModuleFormular } from '../../types';

const Formular: React.FC<ModuleFormular> = ({ data, option }) => {
   return (
      <>
         <AdminFormInput type="tinytext" icon="field" label="Name" name="name" value={data['name']} required />
         <AdminFormInput type="longtext" icon="textarea" label="Description" name="description" value={data['description']} />
         <AdminFormInput type="tinytext" icon="tags" label="Tags" name="tags" value={data['tags']} />
         <AdminFormInput type="parent" icon="artist" label="Artist" name="artistId" value={data['artist']?.id ?? ''} option={option?.["artist"]} required />
         <AdminFormInput type="image" icon="artwork" label="Image" name="image" value={data['id']} />
         <AdminFormInput type="tinytext" icon="date" label="Year" name="year" value={data['year']} required />
         <AdminFormInput type="parent" icon="art" label="Genre" name="artworkGenreId" value={data['artworkGenre']?.["id"] ?? ''} option={option?.['artwork_genre']} required />
         <AdminFormInput type="parent" icon="worktype" label="Worktype" name="artworkWorktypeId" value={data['artworkWorktype']?.id ?? ''} option={option?.["artwork_worktype"]} required />
         <AdminFormInput type="parent" icon="paper" label="Material" name="artworkMaterialId" value={data['artworkMaterial']?.id ?? ''} option={option?.["artwork_material"]} required />
         <AdminFormInput type="parent" icon="palette" label="Technique" name="artworkTechniqueId" value={data['artworkTechnique']?.id ?? ''} option={option?.["artwork_technique"]} required />
         <AdminFormInput type="tinytext" icon="measurements" label="Measurements" name="measurements" value={data['measurements']} />
         <AdminFormInput type="boolean" icon="question" label="Public" name="public" value={data['public']} />
      </>
   );
}

export default Formular;

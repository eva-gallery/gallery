'use client'

import React from 'react';
import { A } from '@/app/admin';
import { M } from '@/app/admin/modules';

type Props = {
   fields: any;
   data: { [key: string]: any };
   options?: { [key: string]: { value: number, label: string } };
};

const Formular: React.FC<Props> = ({ fields, data, options }) => {


   return (
      <>
         <A.Form.Input type="tinytext" icon="artist" label="Name" name="name" value={data['name']} />
         <A.Form.Input type="text" icon="textarea" label="Description" name="description" value={data['description']} />
         <A.Form.Input type="parent" icon="artist" label="Artist" name="artist-name" value={data['artist-name']} options={options?.["artist"]} />
         <A.Form.Input type="image" icon="artwork" label="Image" name="image" value={data['image']} />
         <A.Form.Input type="enum" icon="category" label="Category" name="category-name" value={data['category-name']} options={options?.["category"]} />
         <A.Form.Input type="tinytext" icon="date" label="Year" name="year" value={data['year']} />
         <A.Form.Input type="parent" icon="art" label="Genre" name="artwork_genre-name" value={data['artwork_genre-name']} options={options?.["artwork_genre"]} />
         <A.Form.Input type="parent" icon="worktype" label="Worktype" name="artwork_worktype-name" value={data['artwork_worktype-name']} options={options?.["artwork_worktype"]} />
         <A.Form.Input type="parent" icon="paper" label="Material" name="artwork_material-name" value={data['artwork_material-name']} options={options?.["artwork_material"]} />
         <A.Form.Input type="parent" icon="palette" label="Technique" name="artwork_technique-name" value={data['artwork_technique-name']} options={options?.["artwork_technique"]} />
         <A.Form.Input type="tinytext" icon="measurements" label="Measurements" name="measurements" value={data['measurements']} />
         <A.Form.Input type="boolean" icon="question" label="Active" name="active" value={data['active']} />
      </>
   );
}

export default Formular;

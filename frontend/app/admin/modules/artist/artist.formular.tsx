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
         <A.Form.Input type="date" icon="date" label="Born" name="born" value={data['born']} />
         <A.Form.Input type="text" icon="textarea" label="Bio" name="bio" value={data['bio']} />
         <A.Form.Input type="parent" icon="globe" label="Country" name="country-name" value={data['country-name']} options={options?.["country"]} />
         <A.Form.Input type="parent" icon="category" label="Category" name="artist_category-name" value={data['artist_category-name']} options={options?.["artist_category"]} />
         <A.Form.Input type="boolean" icon="question" label="Active" name="active" value={data['active']} />

      </>
   );
}

export default Formular;

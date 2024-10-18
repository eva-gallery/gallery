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
         <A.Form.Input type="longtext" icon="address" label="Address" name="address" value={data['address']} />
         <A.Form.Input type="parent" icon="globe" label="Country" name="country-name" value={data['country-name']} options={options?.["country"]} />
         <A.Form.Input type="varchar" icon="map" label="GPS" name="gps" value={data['gps']} />
         <A.Form.Input type="boolean" icon="question" label="Active" name="active" value={data['active']} />
      </>
   );
}

export default Formular;

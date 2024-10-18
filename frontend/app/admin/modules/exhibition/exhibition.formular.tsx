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
         <A.Form.Input type="tinytext" icon="exhibition" label="Name" name="name" value={data['name']} />
         <A.Form.Input type="date" icon="date" label="Date since" name="date_since" value={data['date_since']} />
         <A.Form.Input type="date" icon="date" label="Date to" name="date_to" value={data['date_since']} />
         <A.Form.Input type="tinytext" icon="client" label="Curator" name="curator" value={data['curator']} />
         <A.Form.Input type="parent" icon="gallery" label="Gallery" name="gallery-name" value={data['gallery-name']} options={options?.["gallery"]} />
         <A.Form.Input type="boolean" icon="question" label="Active" name="active" value={data['active']} />
      </>
   );
}

export default Formular;

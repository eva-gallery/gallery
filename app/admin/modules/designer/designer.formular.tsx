'use client'

import React from 'react';
import { AdminFormInput } from '../../components/form';
import { ModuleFormular } from '../../types';


const Formular: React.FC<ModuleFormular> = ({ data, option }) => {


   return (
      <>
         <AdminFormInput type="tinytext" icon="designer" label="Name" name="name" value={data['name']} required />
         <AdminFormInput type="parent" icon="exhibition" label="Exhibition" name="exhibitionId" value={data['exhibition']?.["id"] ?? ''} option={option?.['exhibition']} required />
      </>
   );
}

export default Formular;

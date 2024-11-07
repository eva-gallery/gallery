'use client'

import React from 'react';
import { AdminFormInput } from '../../components/form';
import { ModuleFormular } from '../../types';

export const Formular: React.FC<ModuleFormular> = ({ data, option }) => {
   return (
      <>
         <AdminFormInput type="tinytext" icon="field" label="Name" name="name" value={data.nftData['name']} required />
         <AdminFormInput type="longtext" icon="textarea" label="Description" name="description" value={data.nftData['metadata']} />
      </>
   );
}


import React from 'react';


import AdminInsert from './insert';
import { AdminType } from '../types';
import { capitalize } from '../functions/tools';
import { M } from '../modules';
import { AdminIcon } from './components';

type Props = {
  admin: AdminType;
  object: any;
  children: React.ReactNode;
};

const AdminList: React.FC<Props> = ({ admin, object, children }) => {

  const Module = M[capitalize(admin.modul) as keyof typeof M] || (() => <div>Unknown module</div>);

  return (
    <>
      <h1 className='text-center mb-5'>
        <AdminIcon name={Module.Data.icon} size={48} className='me-3' />
        {Module.Data.name}
      </h1>

      {children}

      <AdminInsert admin={admin}>
        <Module.Formular data={object.data} option={object.option} />
      </AdminInsert>
    </>
  );
};


export default AdminList;

import React from 'react';
import { Table } from 'react-bootstrap';

import { A } from '@/app/admin';
import { M } from '@/app/admin/modules';

import { AdminType } from '@/app/admin/types';

type Props = {
  admin: AdminType;
  children: React.ReactNode;
};

const AdminList: React.FC<Props> = ({ admin, children }) => {

  const Module = M[A.capitalize(admin.module) as keyof typeof M] || (() => <div>Unknown module</div>);

  return (
    <>
      <h1 className='text-center mb-5'>
        <A.Icon name={Module.Data.icon} size={48} className='me-3' />
        {Module.Data.name}
      </h1>

      {children}

      {/* <V.Insert admin={admin}>
        <Module.Formular fields={Module.Data.fields} options={object.options} />
      </V.Insert> */}
    </>
  );
};


export default AdminList;


import React from 'react';
import { Row, Col } from 'react-bootstrap';


import { AdminType } from '../types';

import { M } from '@/app/admin/modules';
import AdminEdit from '@/app/admin/components/edit';
import { AdminIcon } from '@/app/admin/components/components';
import { capitalize } from '@/app/admin/functions/tools';


type Props = {
  admin: AdminType;
  object: any;
  children: React.ReactNode;
};

interface DetailComponent extends React.FC<Props> {
  Row: typeof AdminDetailRow;
}

const AdminDetail: DetailComponent = ({ admin, object, children }) => {

  const Module = M[capitalize(admin.modul) as keyof typeof M] || (() => <div>Unknown module</div>);

  console.log('AdminDetail', object);

  return (
    <>
      <h1 className='mb-3'>
        <AdminIcon name={Module.Data.icon} size={48} className='me-3' />
        {Module.Data.name}
      </h1>

      <hr />

      {children}

      <Row className='mb-5'>
        <Col className='col-md-3 py-2' />
        <Col className='py-2'>
          <AdminEdit admin={admin}>
            <Module.Formular data={object.data} option={object.option} />
          </AdminEdit>
        </Col>
      </Row>
    </>
  );
};


interface DetailRowProps {
  icon: string;
  name: string;
  children: React.ReactNode;
}

const AdminDetailRow: React.FC<DetailRowProps> = ({ icon, name, children }) => {

  return (
    <Row>
      <Col className='col-md-3 py-2'>
        <AdminIcon name={icon} size={24} className='me-2' />
        {name}
      </Col>
      <Col className='py-2'>
        {children}
      </Col>
    </Row>
  );
};



AdminDetail.Row = AdminDetailRow;

export default AdminDetail;


import React from 'react';
import { Row, Col } from 'react-bootstrap';


import { A } from '@/app/admin';
import { AdminType } from '../types';

import { M } from '@/app/admin/modules';


type Props = {
  admin: AdminType;
  object: any;
  children: React.ReactNode;
};

interface DetailComponent extends React.FC<Props> {
  Row: typeof AdminDetailRow;
}

const AdminDetail: DetailComponent = ({ admin, object, children }) => {

  const Module = M[A.capitalize(admin.module) as keyof typeof M] || (() => <div>Unknown module</div>);


  return (
    <>
      <h1 className='mb-3'>
        <A.Icon name={Module.Data.icon} size={48} className='me-3' />
        {Module.Data.name}
      </h1>

      <hr />

      {children}

      <Row>
        <Col className='col-md-3 py-2' />
        <Col className='py-2'>
          <A.Edit admin={admin}>
            {/* <Module.Formular data={object.data} options={object.options} /> */}
          </A.Edit>
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
        <A.Icon name={icon} size={24} className='me-2' />
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

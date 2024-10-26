
import React from 'react';
import { Row, Col } from 'react-bootstrap';


import { V } from '@/app/viktor';
import objectX from '@/app/framework/objectx';
import { ViktorType } from '../types';

import { M } from '@/app/viktor/modules';
import Form from 'react-bootstrap/Form';

type Props = {
  viktor: ViktorType;
  data: objectX;
  children: React.ReactNode;
};

const ViktorDetail: React.FC<Props> = ({ viktor, data, children }) => {

  return (
    <>
      <h1 className='text-uppercase mb-3'>
        <V.Icon name={viktor.module} size="48" className='me-3' />
        {viktor.module} #{data.id}
      </h1>

      <hr />

      {children}

      <Row>
        <Col className='col-md-3 py-2'>
        </Col>
        <Col className='py-2'>
          <V.Edit module={viktor.module}>
            <Form>
              <M.Gallery.Form viktor={viktor} object={data} />
            </Form>
          </V.Edit>
        </Col>
      </Row>
    </>
  );
};


const ViktorDetailRow: React.FC = ({ icon, name, children }) => {
  return (
    <Row>
      <Col className='col-md-3 py-2'>
        <V.Icon name={icon} size="24" className='me-2' />
        {name}
      </Col>
      <Col className='py-2'>
        {children}
      </Col>
    </Row>
  );
};

ViktorDetail.Row = ViktorDetailRow;

export default ViktorDetail;

'use client';

import React from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AdminType } from '../../types';
import { AdminIcon } from '../../components/components';
import { AdminForm } from '../../components/form';
import AdminUserResetPassword from './user.reset';
import { FormularResetPassword } from './user.formular';


type Props = {
  admin: AdminType;
};

const AdminUserResetForm: React.FC<Props> = ({ admin }) => {



  return (
    <>
      <h1 className='text-center mb-5'>
        <AdminIcon name="user" size={48} className='me-3' />
        Reset Password
      </h1>

      <AdminForm method="POST" type="JSON" endpoint="/admin/user/request-password-reset" admin={admin}>
        <Form.Group className="mb-3" >
          <Row className='justify-content-center'>
            <Col xs={2}>
              <Form.Label>
                <AdminIcon name="email" size={24} className='me-2' />
                Email
              </Form.Label>
            </Col>
            <Col xs={4}>
              <Form.Control name="email" type="email" placeholder="email@domain.com" required />
            </Col>
          </Row>
        </Form.Group>


        <Row className='justify-content-center'>
          <Col xs={2}>
          </Col>
          <Col xs={4}>
            <Button variant="danger" type="submit">
              Reset
              <FontAwesomeIcon icon={faArrowRight} fixedWidth className='ms-2' />
            </Button>

          </Col>
        </Row>
      </AdminForm>

    </>
  );
}

export default AdminUserResetForm;
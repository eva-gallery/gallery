'use client';

import React from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AdminType } from '../types';
import { AdminIcon } from './components';
import { AdminForm } from './form';


type Props = {
  admin: AdminType;
};

const AdminLogin: React.FC<Props> = ({ admin }) => {



  return (
    <>
      <h1 className='text-center mb-5'>
        <AdminIcon name="user" size={48} className='me-3' />
        Login
      </h1>

      <AdminForm method="POST" endpoint="/admin/login" admin={admin}>
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

        <Form.Group className="mb-3" >
          <Row className='justify-content-center'>
            <Col xs={2}>
              <Form.Label>
                <AdminIcon name="password" size={24} className='me-2' />
                Password
              </Form.Label>
            </Col>
            <Col xs={4}>
              <Form.Control name="password" type="password" placeholder="Password" required />
            </Col>
          </Row>

        </Form.Group>

        <Row className='justify-content-center'>
          <Col xs={2}>
          </Col>
          <Col xs={4}>
            <Button variant="primary" type="submit">
              Login
              <FontAwesomeIcon icon={faArrowRight} fixedWidth className='ms-2' />
            </Button>
          </Col>
        </Row>
      </AdminForm>

    </>
  );
}

export default AdminLogin;
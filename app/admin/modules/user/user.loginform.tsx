'use client';

import React from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
import { AdminType } from '../../types';
import { AdminIcon } from '../../components/components';
import { AdminForm } from '../../components/form';
import AdminUserResetPassword from './user.reset';
import { FormularResetPassword } from './user.formular';


type Props = {
  admin: AdminType;
};

const AdminUserLoginForm: React.FC<Props> = ({ admin }) => {

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


  return (
    <>
      <h1 className='text-center mb-5'>
        <AdminIcon name="user" size={48} className='me-3' />
        Login
      </h1>

      <AdminForm method="POST" type="JSON" endpoint="/admin/login" admin={admin}>
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

            <Button as="a" href="/admin/user/reset" variant="danger" className='ms-2'>
              <FontAwesomeIcon icon={faTriangleExclamation} fixedWidth className='me-2' />
              Reset Password
            </Button>
            <br />
            <Button as="a" href={`${backendUrl}/admin/google/login?redirect_url=/admin`} variant="light" className='mt-5 border'>
              <img src="/images/logo/google_logo.svg" className='me-2' />
              Login with Google
            </Button>
            <hr className="my-5" />
            <Button as="a" href={`/admin/user/register`} variant="success" className='border'>
              <FontAwesomeIcon icon={faUser} fixedWidth className='me-2' />
              Register as new user
            </Button>
          </Col>
        </Row>
      </AdminForm >

    </>
  );
}

export default AdminUserLoginForm;
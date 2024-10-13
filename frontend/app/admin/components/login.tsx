'use client';

import React from 'react';
import { A } from '@/app/admin';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { AdminType } from '@/app/admin/types';

type Props = {
  admin: AdminType;
};

const AdminLogin: React.FC<Props> = ({ admin }) => {



  return (
    <>
      <h1 className='text-center mb-5'>
        <A.Icon name="user" size={48} className='me-3' />
        Login
      </h1>

      <A.Form admin={admin}>
        <Form.Group className="mb-3" >
          <Row className='justify-content-center'>
            <Col xs={2}>
              <Form.Label>
                <A.Icon name="email" size={24} className='me-2' />
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
                <A.Icon name="password" size={24} className='me-2' />
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
      </A.Form>

    </>
  );
}

export default AdminLogin;
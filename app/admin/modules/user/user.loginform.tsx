'use client';

import React, { useState } from 'react';
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExclamationTriangle, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
import { AdminIcon } from '../../components/components';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import SaveSession from '../../functions/savesession';

const AdminUserLoginForm: React.FC = () => {
  const router = useRouter();
  //const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const backendUrl = "https://cdn.evagallery.eu";
  //console.log("**** backendUrl ****", backendUrl);

  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setShowAlert(false);

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
      const json = new FormData(form);

      axios.defaults.withCredentials = true;

      const body = JSON.stringify(Object.fromEntries(json.entries()));
      const headers = {
        "Content-Type": "application/json",
      };

      //console.log("**** adminSetData JSON ****", body);

      try {
        const response = await axios({
          method: "POST",
          url: `${backendUrl}/admin/login`,
          headers: headers,
          data: body,
        });

        console.log("Login successful:", response.data);

        try {
          const response = await axios({
            method: "GET",
            url: `${backendUrl}/admin/session`,
            headers: headers
          });
          SaveSession({ bearerToken: response.data.id });
          router.push('/admin');

        } catch (err: any) {
          console.log("**** Error ****", err.response);
        }


      } catch (err: any) {
        console.log("**** Error ****", "err.response");

        let error = 'Error fetching data. Server down?';
        if (err.response && err.response.status === 401) {
          error = "Wrong Email or Password!";
        } else if (err.response && err.response.status === 404) {
          error = err.response.data.message;
        } else if (err.response && err.response.status === 500) {
          error = "Backend down! Error 500";
        }
        setAlertMessage(error);
        setShowAlert(true);
      }
    }
  };

  return (
    <>
      <h1 className='text-center mb-5'>
        <AdminIcon name="user" size={48} className='me-3' />
        Login
      </h1>

      <Form id="form" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
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

        <Form.Group className="mb-3">
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
          <Col xs={2}></Col>
          <Col xs={4}>
            <Button variant="primary" type="submit">
              Login
              <FontAwesomeIcon icon={faArrowRight} fixedWidth className='ms-2' />
            </Button>

            <Button as="a" href="/admin/user/reset" variant="danger" className='ms-2'>
              <FontAwesomeIcon icon={faTriangleExclamation} fixedWidth className='me-2' />
              Reset Password
            </Button>

            <Button as="a" href={`/admin/user/register`} variant="success" className='ms-2'>
              <FontAwesomeIcon icon={faUser} fixedWidth className='me-2' />
              Register
            </Button>
            <Button as="a" href={`${backendUrl}/admin/google/login?redirect_url=/admin`} variant="light" className='mt-5 border'>
              <img src="/images/logo/google_logo.svg" className='me-2' />
              Login with Google
            </Button>

          </Col>
        </Row>
        {showAlert && (
          <div className='text-center'>
            <Alert variant="danger" className='mt-5 d-inline-block'>
              <FontAwesomeIcon icon={faExclamationTriangle} size="2x" className='me-2' />
              {alertMessage}
            </Alert>
          </div>
        )}
      </Form>
    </>
  );
};

export default AdminUserLoginForm;

'use client'

import React, { useState } from 'react';
import { Row, Col, Form, Alert } from 'react-bootstrap';


import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';

import { M } from '@/app/admin/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';



type Props = {
  admin: AdminType;
  children: React.ReactNode;
};

const AdminForm: React.FC<Props> = ({ admin, children }) => {

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
      const formData = new FormData(form);
      const data = await A.setData(formData, admin);

      if (data && data.alert) {
        setAlertMessage(data.alert);
        setShowAlert(true);
      }

    }
    setValidated(true);
  };

  return (
    <>
      <Form id="form-detail" noValidate validated={validated} onSubmit={handleSubmit}>
        {children}
      </Form>
      {showAlert && (
        <div className='text-center'>
          <Alert variant="danger" className='mt-5 d-inline-block'>
            <FontAwesomeIcon icon={faExclamationTriangle} size="2x" className='me-2' />
            {alertMessage}
          </Alert>
        </div>
      )}
    </>
  );
};



type AdminFormInputProps = {
  type: string;
  icon: string;
  label: string;
  name: string;
  value: string;
  options?: { value: string; label: string }[];
};

const AdminFormInput: React.FC<AdminFormInputProps> = ({ type, icon, label, name, value, options }) => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={4} >
        <A.Icon name={icon} size={24} className='me-2' />
        {label}
      </Form.Label>
      <Col sm={8}>
        {/* <AdminFormInputType type={type} name={name} value={value} options={options} /> */}
      </Col>
    </Form.Group>
  );
};


type AdminFormInputTypeProps = {
  type: string;
  name: string;
  value: string;
  options?: { value: string; label: string }[];
};



export default AdminForm;

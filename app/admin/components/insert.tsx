"use client"

import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';


import { AdminButtonInsert } from './button';
import { AdminIcon } from './components';
import { AdminForm } from './form';
import { AdminType } from '../types';

type Props = {
  admin: AdminType;
  children: React.ReactNode;
};

const AdminInsert: React.FC<Props> = ({ admin, children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <AdminButtonInsert handleShow={handleShow} />

      <Modal size="lg" show={show} onHide={handleClose} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            <AdminIcon name={admin.modul} className='me-2' size={36} />
            Insert New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <AdminForm admin={admin} method="POST" endpoint={`/admin/${admin.modul}/create`} onSuccess={handleClose}>
            {children}
          </AdminForm>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" form="form" type="submit">
            <FontAwesomeIcon icon={faCheck} fixedWidth className='me-1' />
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default AdminInsert;

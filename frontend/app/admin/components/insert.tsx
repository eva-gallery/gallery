"use client"

import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';

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
      <A.Button.Insert handleShow={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <V.Icon name={admin.module} className='me-2' size={36} />
            Insert New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <V.Form admin={admin}>
            {children}
          </V.Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            <FontAwesomeIcon icon={faCheck} fixedWidth className='me-1' />
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default AdminInsert;

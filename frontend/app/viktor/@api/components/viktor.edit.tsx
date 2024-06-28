"use client"

import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons';


import { V } from '@/app/viktor';

const ViktorEdit: React.FC = ({ module, children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        <FontAwesomeIcon icon={faPen} fixedWidth className='me-1' />
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <V.Icon name={module} className='me-2' size="36" />
            Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose} className='me-auto'>
            <FontAwesomeIcon icon={faTrashCan} fixedWidth className='me-1' />
            Delete
          </Button>
          <Button variant="success" onClick={handleClose}>
            <FontAwesomeIcon icon={faCheck} fixedWidth className='me-1' />
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default ViktorEdit;

"use client"

import React from 'react';
import { useState } from 'react';
import { Col, Row, Form, Button, InputGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons';


import { A } from '@/app/admin';

import { AdminType } from '@/app/admin/types';

type Props = {
  admin: AdminType;
  children: React.ReactNode;
};

const AdminEdit: React.FC<Props> = ({ admin, children }) => {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  admin.action = "edit";

  return (
    <>


      <Button variant="success" onClick={handleShow}>
        <FontAwesomeIcon icon={faPen} fixedWidth className='me-1' />
        Edit
      </Button>


      <Modal size="lg" scrollable show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <A.Icon name={admin.module} className='me-2' size={36} />
            Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <A.Form admin={admin}>
            {children}
          </A.Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose} className='me-auto'>
            <FontAwesomeIcon icon={faTrashCan} fixedWidth className='me-1' />
            Delete
          </Button>
          <Button variant="success" form="form-detail" type="submit" onClick={handleClose} >
            <FontAwesomeIcon icon={faCheck} fixedWidth className='me-1' />
            Save
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  );
};


export default AdminEdit;

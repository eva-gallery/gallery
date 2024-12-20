"use client"

import React from 'react';
import { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faCheck } from '@fortawesome/free-solid-svg-icons';


import { AdminType } from '@/app/admin/types';
import { AdminIcon } from './components';
import { AdminForm } from './form';
import { AdminDeleteData } from '../functions/delete.data';

type Props = {
  admin: AdminType;
  children: React.ReactNode;
};

const AdminEdit: React.FC<Props> = ({ admin, children }) => {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleDelete = async () => {
    try {

      await AdminDeleteData(admin, `/admin/${admin.modul}/delete/${admin.unique}`);
      //window.location.reload();

    } catch (error) {
      console.error("Error while deleting record:", error);
    }
  };

  admin.action = "edit";

  return (
    <>

      <Button variant="success" onClick={handleShow}>
        <FontAwesomeIcon icon={faPen} fixedWidth className='me-1' />
        Edit
      </Button>


      <Modal size="lg" scrollable show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>
            <AdminIcon name={admin.modul} className='me-2' size={36} />
            Edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <AdminForm admin={admin} method="PATCH" endpoint={`/admin/${admin.modul}/update/${admin.unique}`} onSuccess={handleClose}>
            {children}
          </AdminForm>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete} className='me-auto'>
            <FontAwesomeIcon icon={faTrashCan} fixedWidth className='me-1' />
            Delete
          </Button>
          <Button variant="success" form="form" type="submit" >
            <FontAwesomeIcon icon={faCheck} fixedWidth className='me-1' />
            Save
          </Button>
        </Modal.Footer>
      </Modal >


    </>
  );
};


export default AdminEdit;

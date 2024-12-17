"use client"

import React from 'react';
import { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan, faCheck, faLock } from '@fortawesome/free-solid-svg-icons';


import { AdminType } from '@/app/admin/types';
import { AdminIcon } from '../../components/components';
import { AdminForm } from '../../components/form';
import { AdminDeleteData } from '../../functions/delete.data';

type Props = {
  admin: AdminType;
  children: React.ReactNode;
};

const AdminUserPassword: React.FC<Props> = ({ admin, children }) => {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleEdit = () => {
    handleClose();
    window.location.reload();
  }

  admin.action = "edit";

  return (
    <>

      <Button variant="danger" onClick={handleShow} className='ms-2'>
        <FontAwesomeIcon icon={faLock} fixedWidth className='me-1' />
        Change Password
      </Button>


      <Modal size="lg" scrollable show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>
            <AdminIcon name={admin.modul} className='me-2' size={36} />
            Change Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <AdminForm admin={admin} type="JSON" method="POST" endpoint={`/admin/user/change-password`} onSuccess={handleEdit}>
            {children}
          </AdminForm>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" form="form" type="submit" >
            <FontAwesomeIcon icon={faCheck} fixedWidth className='me-1' />
            Save
          </Button>
        </Modal.Footer>
      </Modal >


    </>
  );
};


export default AdminUserPassword;

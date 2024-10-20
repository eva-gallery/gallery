"use client"

import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';

type Props = {
  viktor: ViktorType;
  children: React.ReactNode;
};

const ViktorInsert: React.FC<Props> = ({ viktor, children }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <V.Button.Insert handleShow={handleShow}/>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <V.Icon name={viktor.module} className='me-2' size={36} />
            Insert New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
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


export default ViktorInsert;

import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import { AdminType } from '@/app/admin/types';

type Props = {
  admin: AdminType;
};

type AdminButtonProps = {

};

type PropsInsert = {
  handleShow: any;
};


interface AdminButtonType extends React.FC<AdminButtonProps> {
  Detail: React.FC<Props>;
  Insert: React.FC<PropsInsert>;
};


export const AdminButtonDetail: React.FC<Props> = ({ admin }) => {
  return (
    <a href={`/admin/${admin.modul}/detail/${admin.unique}`} className='btn btn-primary'>
      <FontAwesomeIcon icon={faArrowRight} />
    </a>
  );
};

export const AdminButtonInsert: React.FC<PropsInsert> = ({ handleShow }) => {
  return (
    <Button variant="success" className='d-block mx-auto' onClick={handleShow}>
      <FontAwesomeIcon icon={faPlus} fixedWidth className='me-2' />
      Insert new
    </Button>
  );
};

export const AdminButtonEdit: React.FC<PropsInsert> = ({ handleShow }) => {
  return (
    <Button variant="success" className='d-block mx-auto' onClick={handleShow}>
      <FontAwesomeIcon icon={faPen} fixedWidth className='me-2' />
      Edit
    </Button>
  );
};

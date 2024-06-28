import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ViktorType } from '@/app/viktor/@api/types';

type Props = {
  viktor: ViktorType;
};

type ViktorButtonProps = {

};

type PropsInsert = {
  handleShow: any;
};


interface ViktorButtonType extends React.FC<ViktorButtonProps> {
  Detail: React.FC<Props>;
  Insert: React.FC<PropsInsert>;
};

const ViktorButton: ViktorButtonType = ({ }) => {
  return (
    <>      
    </>
  );
};

const ViktorButtonDetail: React.FC<Props> = ({ viktor }) => {
  return (
    <a href={`/viktor/${viktor.module}/detail/${viktor.unique}`} className='btn btn-primary btn-sm'>
      <FontAwesomeIcon icon={faArrowRight} fixedWidth />
    </a>
  );
};

const ViktorButtonInsert: React.FC<PropsInsert> = ({ handleShow }) => {
  return (
    <Button variant="success" className='d-block mx-auto' onClick={handleShow}>
      <FontAwesomeIcon icon={faPlus} fixedWidth className='me-2' />
      Insert new
    </Button>
  );
};

ViktorButton.Detail = ViktorButtonDetail;
ViktorButton.Insert = ViktorButtonInsert;

export default ViktorButton;


import React, { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';

type Props = {
  name: string;
  size: number;
  className?: string;
};

const DatadminInput: React.FC<Props> = ({ name, size, className }) => {

  return (
    <>
    </>
  );
};

type PropsTinytext = {
  name: string;
  value: string;
};

const DatadminTinytext: React.FC<PropsTinytext> = ({ name, value, ...attributes }) => {



  return (
    <Form.Control name={name} value={value} type="text" placeholder="name@example.com" />
  );
};

DatadminInput.Tinytext = DatadminTinytext;


export default DatadminInput;

'use client'

import React, { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Row, Form, Button, InputGroup } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Props = {
  name: string;
  size: number;
  className?: string;
};

type DatadminInputProps = {
  name: string;
  size: number;
  className?: string;
};

const DatadminInput: React.FC<DatadminInputProps> & {
  Tinytext: React.FC<PropsInput>;
  Date: React.FC<PropsInput>;
  Text: React.FC<PropsInput>;
  Mediumtext: React.FC<PropsInput>;
  Boolean: React.FC<PropsInput>;
  Parent: React.FC<PropsInput>;
  Varchar: React.FC<PropsInput>;
  Longtext: React.FC<PropsInput>;
  Enum: React.FC<PropsInput>;
} = ({ }) => {

  return (
    <>
    </>
  );
};

type PropsInput = {
  type: string;
  name: string;
  value: string;
  options?: { value: string; label: string }[];
};


const DatadminTinytext: React.FC<PropsInput> = ({ name, value }) => {
  return <Form.Control name={name} defaultValue={value} type="text" />;
};

const DatadminVarchar: React.FC<PropsInput> = ({ name, value }) => {
  return <Form.Control name={name} defaultValue={value} type="text" />;
};


const DatadminDate: React.FC<PropsInput> = ({ name, value }) => {
  return <Form.Control name={name} defaultValue={value} type="date" />;
};


const DatadminText: React.FC<PropsInput> = ({ name, value }) => {
  const [tvalue, setValue] = useState(value);
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], ['link', 'clean']
    ],
  };
  const formats = ['bold', 'italic', 'underline', 'list', 'bullet', 'indent', 'link'];
  return <ReactQuill value={tvalue} onChange={setValue} modules={modules} formats={formats} className='border rounded' />;
};


const DatadminMediumtext: React.FC<PropsInput> = ({ name, value }) => {
  return <Form.Control as="textarea" rows={3} name={name} defaultValue={value} />;
};

const DatadminLongtext: React.FC<PropsInput> = ({ name, value }) => {
  return <Form.Control as="textarea" rows={3} name={name} defaultValue={value} />;
};


const DatadminBoolean: React.FC<PropsInput> = ({ name, value }) => {
  return <Form.Check type="checkbox" name={name} defaultChecked={value === "true"} />;
};

const DatadminParent: React.FC<PropsInput> = ({ name, value, options }) => {
  return (
    <Form.Select name={name} >
      <option value=""></option>
      {options && options.map((option, index) => (
        <option key={index} value={option.value} selected={value === option.value}>{option.label}</option>
      ))}
    </Form.Select>
  );
};

const DatadminEnum: React.FC<PropsInput> = ({ name, value, options }) => {
  return (
    <Form.Select name={name} >
      {options && options.map((option, index) => (
        <option key={index} value={option.value} selected={value === option.value}>{option.label}</option>
      ))}
    </Form.Select>
  );
};


DatadminInput.Tinytext = DatadminTinytext;
DatadminInput.Date = DatadminDate;
DatadminInput.Text = DatadminText;
DatadminInput.Mediumtext = DatadminMediumtext;
DatadminInput.Boolean = DatadminBoolean;
DatadminInput.Parent = DatadminParent;
DatadminInput.Varchar = DatadminVarchar;
DatadminInput.Longtext = DatadminLongtext;
DatadminInput.Enum = DatadminEnum;


export default DatadminInput;

'use client'

import React, { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Row, Form, Button, InputGroup } from 'react-bootstrap';
//import ReactQuill from 'react-quill';
//import 'react-quill/dist/quill.snow.css';
import AdminImage from './image';

type PropsControl = {
   type: string;
   name: string;
   value: string;
   option: { id: string; name: string }[];
   required?: boolean;
};

export const AdminFormControl: React.FC<PropsControl> = ({ type, name, value, option, required }) => {
   switch (type) {
      case "tinytext":
         return <FormTinytext name={name} value={value} {...(required ? { required: true } : {})} />;
      case "varchar":
         return <FormVarchar name={name} value={value} {...(required ? { required: true } : {})} />;
      case "date":
         return <FormDate name={name} value={value} {...(required ? { required: true } : {})} />;
      // case "text":
      //    return <FormText name={name} value={value} {...(required ? { required: true } : {})} />;
      case "mediumtext":
         return <FormMediumtext name={name} value={value} {...(required ? { required: true } : {})} />;
      case "longtext":
         return <FormLongtext name={name} value={value} {...(required ? { required: true } : {})} />;
      case "boolean":
         return <FormBoolean name={name} value={value} {...(required ? { required: true } : {})} />;
      case "parent":
         return <FormParent name={name} value={value} option={option} {...(required ? { required: true } : {})} />;
      case "enum":
         return <FormEnum name={name} value={value} option={option} {...(required ? { required: true } : {})} />;
      case "image":
         return <FormImage name={name} value={value} {...(required ? { required: true } : {})} />;


      default:
         return null;
   }
}


type PropsInput = {
   name: string;
   value: string;
   option?: { id: string; name: string }[];
   required?: boolean;
};


const FormTinytext: React.FC<PropsInput> = ({ name, value, required }) => {
   return <Form.Control name={name} defaultValue={value} type="text" {...(required ? { required: true } : {})} />;
};

const FormVarchar: React.FC<PropsInput> = ({ name, value, required }) => {
   return <Form.Control name={name} defaultValue={value} type="text" {...(required ? { required: true } : {})} />;
};


const FormDate: React.FC<PropsInput> = ({ name, value, required }) => {

   const date = value ? value.split('T')[0] : '';

   return <Form.Control name={name} defaultValue={date} type="date" {...(required ? { required: true } : {})} />
};


// const FormText: React.FC<PropsInput> = ({ name, value, required }) => {
//    const [tvalue, setValue] = useState(value);
//    const modules = {
//       toolbar: [
//          ['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], ['link', 'clean']
//       ],
//    };
//    const formats = ['bold', 'italic', 'underline', 'list', 'bullet', 'indent', 'link'];
//    return <ReactQuill value={tvalue} onChange={setValue} modules={modules} formats={formats} className='border rounded' />;
// };


const FormMediumtext: React.FC<PropsInput> = ({ name, value, required }) => {
   return <Form.Control as="textarea" rows={3} name={name} defaultValue={value} {...(required ? { required: true } : {})} />;
};

const FormLongtext: React.FC<PropsInput> = ({ name, value, required }) => {
   return <Form.Control as="textarea" rows={3} name={name} defaultValue={value} {...(required ? { required: true } : {})} />;
};


const FormBoolean: React.FC<PropsInput> = ({ name, value, required }) => {
   return <Form.Check type="checkbox" name={name} defaultChecked={value === 'true'} {...(required ? { required: true } : {})} />;
};

export const FormParent: React.FC<PropsInput> = ({ name, value, option, required }) => {
   return (
      <Form.Select name={name} {...(required ? { required: true } : {})} >
         <option value=""></option>
         {option && option.map((option, index) => (
            <option key={index} value={option.id} selected={value === option.id}>{option.name}</option>
         ))}
      </Form.Select>
   );
};

const FormEnum: React.FC<PropsInput> = ({ name, value, option, required }) => {
   return (
      <Form.Select name={name} {...(required ? { required: true } : {})}>
         {option && option.map((option, index) => (
            <option key={index} value={option.id} selected={value === option.id}>{option.name}</option>
         ))}
      </Form.Select>
   );
};

const FormImage: React.FC<PropsInput> = ({ name, value, required }) => {
   return (
      <>
         <Form.Control name={name} type="file" {...(required ? { required: true } : {})} />
         {value && <AdminImage src={`artwork/${value}/thumbnail`} alt={value} width={300} className='mt-3' />}
      </>
   );
};


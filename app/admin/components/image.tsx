'use client'
import React from 'react';



const backendUrl = process.env.
  NEXT_PUBLIC_BACKEND_URL + '/admin';


type Props = {
  src: string;
  [key: string]: any;
};


const AdminImage: React.FC<Props> = ({ src, ...options }) => {

  const rand = Math.random();

  return (
    <>
      <img src={`${backendUrl}/${src}`} {...options} className='img-fluid' />
    </>
  );
};

export default AdminImage;

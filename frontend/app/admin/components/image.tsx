'use client'
import React, { useEffect, useState } from 'react';


const backendUrl = process.env.
  NEXT_PUBLIC_BACKEND_URL + '/admin';


type Props = {
  src: string;
  [key: string]: any;
};


const AdminImage: React.FC<Props> = ({ src, ...options }) => {


  return (
    <>
      <img src={`${backendUrl}/${src}`} {...options} />
    </>
  );
};

export default AdminImage;

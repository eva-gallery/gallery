'use client'
import React from 'react';



const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '/admin';


type Props = {
  src: string;
  [key: string]: any;
};


const AdminImage: React.FC<Props> = ({ src, className = '', ...options }) => {

  return (
    <>
      <img src={`${backendUrl}/${src}`} {...options} className={`img-fluid ${className}`} />
    </>
  );
};

export const AdminNftImage: React.FC<Props> = ({ src, ...options }) => {

  return (
    <>
      <img src={src} {...options} className='img-fluid' />
    </>
  );
};

export const AdminAudio: React.FC<Props> = ({ src, className = '', ...options }) => {

  return (
    <>
      <audio controls className={className}>
        <source src={`${backendUrl}/${src}`} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default AdminImage;

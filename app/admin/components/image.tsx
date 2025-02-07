'use client'
import React, { useEffect, useState } from 'react';



//const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL + '/admin';
const backendUrl = 'https://cdn.evagallery.eu/admin';


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

export const AdminImageCheck: React.FC<Props> = ({ src, className = '', ...options }) => {

  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = `${backendUrl}/${src}`;

    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
  }, [src]);

  return (
    <>
      {isValid ? (
        <img src={`${backendUrl}/${src}`} {...options} className={`img-fluid ${className}`} />
      ) : (null)}
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

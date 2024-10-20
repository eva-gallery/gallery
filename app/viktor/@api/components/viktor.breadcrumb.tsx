'use client'

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation'

import { Breadcrumb } from 'react-bootstrap';


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image'



const ViktorBreadcrumb: React.FC = () => {

  const paths = usePathname();
  const pathNames = paths.split('/').filter(path => path);

  const generateHref = (index: any) => {
    return `/${pathNames.slice(0, index + 1).join('/')}`;
  };

  return (
    <>
      <Breadcrumb data-bs-theme="dark">

        {pathNames.map((module, index) => (
          index === pathNames.length - 1 ? (
            <Breadcrumb.Item key={index} active>
              {module}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={index} href={generateHref(index)}>
              {module}
            </Breadcrumb.Item>
          )
        ))}
      </Breadcrumb>
    </>
  );
};

export default ViktorBreadcrumb;

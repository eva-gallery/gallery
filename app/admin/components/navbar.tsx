'use client'

import React from 'react';
import Image from 'next/image'
import { Container, Nav, Navbar } from 'react-bootstrap';


import { M } from '@/app/admin/modules';


const AdminNavbar: React.FC = () => {

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/admin">
          <Image src="/images/logo/logo-eva-gallery.svg" width="128" height="128" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='justify-content-end'>
          <Nav>
            {M.modules.map((module, index) => (
              (module !== 'Designer' && module !== 'Ai') && (
                <Nav.Link key={index} href={`/admin/${module.toLowerCase()}`} className='text-center text-uppercase'>
                  <Image src={`/images/icons/${module.toLowerCase()}.png`} width="64" height="64" alt={module} className='mb-2' />
                  <br />
                  {module}
                </Nav.Link>
              )
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;

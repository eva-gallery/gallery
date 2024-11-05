'use client'

import { Container, Row, Col } from 'react-bootstrap';
import AdminNavbar from './components/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className='bg-light border-bottom'>
        <AdminNavbar />
      </header>
      <main>
        {children}
      </main>
      <footer className='bg-light border-top'>
        <Container className='py-3'>
          <Row>
            <Col >
              ©2024 EVA Gallery
            </Col>
            <Col className='text-end'>
              All Rights Reserved.
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

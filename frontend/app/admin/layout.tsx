'use client'
import { Container, Row, Col } from 'react-bootstrap';
import { A } from '@/app/admin';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className='bg-light border-bottom'>
        <A.Navbar />
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

'use client'
import { Container, Row, Col } from 'react-bootstrap';
import { V } from '@/app/viktor';
import Image from 'next/image';

export default function ViktorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className='bg-light border-bottom'>
        <V.Navbar />
      </header>
      <main>
        {children}
      </main>
      <footer className='bg-dark text-light py-3'>
        <Container fluid>
          <Row>
            <Col>
              <V.Breadcrumb />
            </Col>
            <Col className='text-end'>
              <Image src="/images/logo/logo-viktor.svg" width="132" height="27" alt="viktor" />
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  )
}

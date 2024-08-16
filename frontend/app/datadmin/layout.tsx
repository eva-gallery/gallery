import type { Metadata } from "next";
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: "Datadmin",
  description: "spravuješ databázu firiem a kontaktov, katalógy produktov či služieb a strácaš prehľad?",
};


export default function DatadminLayout({ children }) {
  return (
    <>
      <header className='bg-dark text-light py-3'>
        <Link href="/">
          <Image src="images/datadmin.svg" alt="Datadmin" width="100" height="100"/>
        </Link> 
      </header>
      <main>
        {children}
      </main>
      <footer className='bg-dark text-light py-3'>
        <Container fluid>
          <p className='my-0'>Datadmin 4.0</p>
        </Container>        
      </footer>
    </>
  )
}

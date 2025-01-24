'use client'
import { Container, Nav, Navbar, Form } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'

const NavbarComponent = () => {
  return (
    <>
      {/* Placeholder div to prevent content from hiding behind fixed navbar */}
      <div style={{ height: '76px' }}></div>
      
      <Navbar expand="lg" className="bg-white shadow-sm py-3 fixed-top">
        <Container className="d-flex align-items-center">
          {/* Logo */}
          <Navbar.Brand as={Link} href="/" className="me-4 py-0">
            <div className="position-relative" style={{ width: '64px', height: '40px' }}>
              <Image
                src="/images/logo/logo-eva-gallery.svg"
                alt="EVA Gallery"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Navbar.Brand>

         {/* Middle section with search + navbar toggle */}
         <div className="d-flex align-items-center ms-auto me-lg-auto">
            {/* Search Bar - visible only on desktop */}
            <div className="d-none d-lg-flex position-relative mx-4" style={{ width: '500px' }}>
              <Form.Control
                type="search"
                placeholder="Search for art..."
                className="ps-5"
              />
              <Search 
                size={18} 
                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
              />
            </div>

            {/* Hamburger menu for mobile */}
            <Navbar.Toggle aria-controls="navbar-nav" className="ms-2 border-0" />
          </div>

          {/* Menu items */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              
              <Nav.Link 
                as={Link} 
                href="/artworks" 
                className="mx-1 text-dark hover:text-primary"
              >
                Artworks
              </Nav.Link>

              <Nav.Link 
                as={Link} 
                href="/artists" 
                className="mx-1 text-dark hover:text-primary"
              >
                Artists
              </Nav.Link>
              
              <Nav.Link 
                as={Link} 
                href="/galleries" 
                className="mx-1 text-dark hover:text-primary"
              >
                Galleries
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                href="/exhibitions" 
                className="mx-1 d-none text-dark hover:text-primary"
              >
                Exhibitions
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                href="/nfts" 
                className="mx-1 text-dark hover:text-primary"
              >
                NFTs
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                href="/3d" 
                className="mx-1 text-dark hover:text-primary"
              >
                3D
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                href="/ai" 
                className="mx-1 text-dark hover:text-primary"
              >
                AI
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                href="https://beta.evagallery.eu/admin/user" 
                className="ms-1 btn btn-outline-primary"
              >
                Login
              </Nav.Link>
            </Nav>
            {/* Search Bar for mobile */}
            <div className="d-lg-none mt-3">
              <div className="position-relative">
                <Form.Control
                  type="search"
                  placeholder="Search artworks..."
                  className="ps-4"
                />
                <Search 
                  size={18} 
                  className="position-absolute top-50 start-0 translate-middle-y ms-2 text-muted"
                />
              </div>
            </div>
          </Navbar.Collapse>
          
        </Container>
      </Navbar>
    </>
  )
}

export default NavbarComponent

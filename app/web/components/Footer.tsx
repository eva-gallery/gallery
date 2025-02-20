'use client'
import { Container, Row, Col } from 'react-bootstrap'
import { Facebook, Twitter, Instagram, Youtube, Github, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer id="contact" className="bg-lightish py-5 mt-5">
      <Container>
        <Row>
          {/* About Column */}
          <Col md={3} className="mb-4">
            <h5 className="mb-3 font-bold">About Us</h5>
            <p className="text-light-emphasis">
            <b>European Visual Arts Gallery</b><br />
            Europe&apos;s first AI-Powered Web3 Gallery for professional Artists and Gallerists.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a target="_blank" href="https://www.facebook.com/evagallery.eu" rel="noopener noreferrer"><Facebook size={20} className="cursor-pointer hover:text-primary" /></a>
              <a target="_blank" href="https://www.instagram.com/evagalleryeu" rel="noopener noreferrer"><Instagram size={20} className="cursor-pointer hover:text-primary" /></a>
              <a target="_blank" href="https://www.youtube.com/@E.V.A.Gallery" rel="noopener noreferrer"><Youtube size={20} className="cursor-pointer hover:text-primary" /></a>
              <a target="_blank" href="https://github.com/eva-gallery" rel="noopener noreferrer"><Github size={20} className="cursor-pointer hover:text-primary" /></a>
            </div>
          </Col>

          {/* Quick Links Column */}
          <Col md={3} className="mb-4">
            <h5 className="mb-3 font-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/artworks" className="text-decoration-none hover:text-primary">Artworks</a>
              </li>
              <li className="mb-2">
                <a href="/artists" className="text-decoration-none hover:text-primary">Artists</a>
              </li>
              <li className="mb-2">
                <a href="/galleries" className="text-decoration-none hover:text-primary">Galleries</a>
              </li>
              <li className="mb-2">
                <a href="/exhibitions" className="d-none text-decoration-none hover:text-primary">Exhibitions</a>
              </li>
              <li className="mb-2">
                <a href="/nfts" className="text-decoration-none hover:text-primary">NFTs </a> / <a href="/3d" className="text-decoration-none hover:text-primary">3D</a> / <a href="/ai" className="text-decoration-none hover:text-primary">AI</a>
              </li>
              <li className="mb-2">
                <a target="_blank" href="https://support.evagallery.eu/en/" className="text-decoration-none hover:text-primary">Help & Support</a>
              </li>
            </ul>
          </Col>

          {/* Contact Info Column */}
          <Col md={3} className="mb-4">
            <h5 className="mb-3 font-bold">Contact Info</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-center gap-2">
                <MapPin size={18} className='text-black' />
                <span className="text-light-emphasis"><a target="_blank" href="https://zdruzenie.euforion.sk/" rel="noopener noreferrer">euforion.sk</a></span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <Mail size={18} className='text-black' />
                <span className="text-light-emphasis">Artist: <a href="mailto:content@evagallery.eu">content@evagallery.eu</a></span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <Mail size={18} className='text-black' />
                <span className="text-light-emphasis">Galleries: <a href="mailto:galleries@evagallery.eu">galleries@evagallery.eu</a></span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-2">
                <Mail size={18} className='text-black' />
                <span className="text-light-emphasis">Support: <a href="mailto:support@evagallery.eu">support@evagallery.eu</a></span>
              </li>
            </ul>
          </Col>

          {/* Partners Column (Replacing Newsletter) */}
          <Col md={3} className="mb-4">
            <h5 className="mb-3 font-bold">Partners</h5>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-evenly align-items-center">
              <a target="_blank" href="https://european-union.europa.eu/" rel="noopener noreferrer">
                  <img src="/images/eu_funded_en.png" alt="EU Funded" className="img-fluid" style={{maxHeight: '60px'}} />
                </a>
                <a target="_blank" href="https://www.ngisearch.eu/" rel="noopener noreferrer">
                  <img src="/images/NGISearch_logo.png" alt="NGI Search" className="img-fluid" style={{maxHeight: '80px'}} />
                </a>
                
              </div>
              <div className="d-flex justify-content-between align-items-center ">
                <a target="_blank" href="https://www.fiit.stuba.sk/" rel="noopener noreferrer">
                  <img src="/images/STU-FIIT.png" alt="STU FIIT" className="img-fluid" style={{maxHeight: '80px'}} />
                </a>
                <a target="_blank" href="https://www.netfire.com/" rel="noopener noreferrer">
                  <img src="/images/netfire2.png" alt="NETFIRE" className="img-fluid" style={{maxHeight: '40px'}} />
                </a>
              </div>
            </div>
          </Col>
        </Row>

        {/* Copyright */}
        <Row className="mt-4 pt-4 border-top border-secondary">
          <Col className="text-left text-light-emphasis">
            <p className="mb-0">© {new Date().getFullYear()} E.V.A Gallery. All rights reserved.</p>
          </Col>
          <Col className="text-center text-light-emphasis">
            <a href="/terms">Terms of Service | Privacy Policy</a>
          </Col>
          <Col className="text-end text-light-emphasis">
           Powered by: <a target="_blank" href="https://www.netfire.com/" rel="noopener noreferrer">
                   <img src="/images/netfire.png" alt="NETFIRE" className="img-fluid" style={{maxHeight: '20px'}} />
                </a>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer

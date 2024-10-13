'use server'

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';


export default async function Viktor() {

  return (
    <>

      <Container className='py-5 '>
        <h1>European Visual Arts Gallery</h1>

        <p className="lead">Europe's first AI-Powered Web3 Gallery for professional Artists and Gallerists.</p>
        <p>The primary goal of this research project is to create a new platform for exploring, presenting, and supporting European visual art in virtual space. Our vision emphasizes sustainability and leverages cutting-edge technologies like AI, virtual reality, and blockchain for long-term development.</p>

        <p><strong>3D Virtual Gallery</strong></p>

        <p>Artists and gallerists can design their own virtual gallery spaces using a specialized 3D Designer tool, enabling creative control over artwork presentation.
          The E.V.A. Gallery project incorporates several innovative technological components. A web-based 3D Viewer allows visitors to browse artworks and exhibitions in an immersive environment, optimized for desktop browsers.
        </p>

        <p><strong>AI Art Protection</strong></p>

        <p>To prevent art theft, we use Nightshade and Glaze, state-of-the-art art protection techniques that imperceptibly alter your artwork and prevent AI from learning your unique art identity and style. EVA Gallery employs an embedding space lookup for plagiarism protection to compare artworks against a database of existing pieces. Using our powerful AI-powered search, you can find the exact art pieces that match your taste.
        </p>

        <p><strong>NFT minting and presentation</strong></p>

        <p>The platform integrates wallet connection mechanisms and NFT functionality, allowing artists to incorporate blockchain technology into their collections. An AI-based recommendation engine provides personalized experiences for visitors, enhancing engagement with the artworks.
        </p>




      </Container>

    </>

  );
}

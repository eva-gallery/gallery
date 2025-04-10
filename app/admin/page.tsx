'use server'

import { Container } from 'react-bootstrap';

export default async function Viktor() {

  return (
    <>

      <Container className='py-5 '>


        <h1>European Visual Arts Gallery</h1>

        <p className="lead mb-5">Europes first AI-Powered Web3 Gallery for professional Artists and Gallerists.</p>

        <p className='mb-5'>
          <span className='bg-light border p-2'>
            Welcome to ADMIN zone!
          </span>
        </p>

        <p><strong>Quick Tutorial:</strong></p>

        <ol>
          <li>Go to <a href="admin/gallery" className="text-uppercase">Gallery</a> and insert new gallery.</li>
          <li>Go to <a href="admin/exhibition" className="text-uppercase">Exhibition</a> and insert new exhibition. Choose the gallery you inserted.</li>
          <li>Go to <a href="admin/artist" className="text-uppercase">Artist</a> and insert new artist.</li>
          <li>Go to <a href="admin/artwork" className="text-uppercase">Artwork</a> and insert new artwork. Choose the artist you inserted. Upload image file of your artwork. Then insert Artwork in Exhibition.</li>
          {/* <li>Go to <a href="admin/designer" className="text-uppercase">Designer</a> and insert new designer. Choose the exhibition with uploaded artworks.</li> */}
          <li>Go to <a href="admin/nft" className="text-uppercase">Nft</a> to connect your NFT wallets and Mint your artworks.</li>
          <li>Go to <a href="admin/user" className="text-uppercase">User</a> to manage your profile.</li>
        </ol>

        <p>  <a href="/" className='btn btn-primary'>Go to Public webpage</a></p>
      </Container>

    </>

  );
}

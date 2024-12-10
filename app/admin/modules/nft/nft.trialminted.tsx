'use server'

import { faArrowRight, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row } from 'react-bootstrap';
import AdminImage, { AdminNftImage } from '../../components/image';
import { M } from '..';
import { AdminIcon } from '../../components/components';


export async function Trialminted(nft: any) {
   const data = nft.data;
   return (

      <>
         <h2>Trial minted NFT Artwork</h2>

         <Row>
            <Col xs="auto">
               {/* <AdminNftImage src={data['nftData'].image} alt={data['nftData'].name} width={480} /> */}
               <AdminImage src={`artwork/${data.nft['artwork'].id}/thumbnail`} alt={data['name']} width={480} />
            </Col>
            <Col>
               <p>
                  <AdminIcon name='artwork' size={24} className='me-1' />
                  <a href={`/admin/artwork/detail/${data.nft['artwork'].id}`}>
                     <strong>
                        {data.nft['artwork'].name}
                     </strong><br />
                  </a>
               </p>
               <h3>{data.nft['nftData'].name}</h3>
               <p className='border p-3'>{data.nft['nftData'].description}</p>

                    <p className="d-flex align-items-center">
                     <Button as="a" href={`/admin/nft/detail/${data.nft['id']}`} className="btn btn-primary me-2">
                       NFT Detail
                       <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                     </Button>

                     {data.paid && data.claimed ? (
                       <span className="text-muted">
                        Your artwork is already claimed, see NFT detail for more information.
                       </span>
                     ) : (
                       <M.Nft.Ownership />
                     )}
                    </p>


            </Col>
         </Row>

         <hr className='my-5' />

      </>

   );
};

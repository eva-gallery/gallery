'use server'

import { faArrowRight, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Row } from 'react-bootstrap';
import AdminImage, { AdminNftImage } from '../../components/image';
import { M } from '..';
import { AdminIcon } from '../../components/components';


export async function Trialminted(nft: any) {
   const data = nft.data;
   console.log("****** trialMintId", data);
   return (

      <>
         <h2>Trial minted NFT Artwork</h2>

         <Row>
            <Col xs="auto">
               {/* <AdminNftImage src={data['nftData'].image} alt={data['nftData'].name} width={480} /> */}
               <AdminImage src={`artwork/${data['artwork'].id}/thumbnail`} alt={data['name']} width={480} />
            </Col>
            <Col>
               <p>
                  <AdminIcon name='artwork' size={24} className='me-1' />
                  <a href={`/admin/artwork/detail/${data['artwork'].id}`}>
                     <strong>
                        {data['artwork'].name}
                     </strong><br />
                  </a>
               </p>
               <h3>{data['nftData'].name}</h3>
               <p className='border p-3'>{data['nftData'].description}</p>

               <p>
                  <Button as="a" href={`/admin/nft/detail/${data['id']}`} className="btn btn-primary me-2">
                     NFT Detail
                     <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                  </Button>

                  <M.Nft.Ownership />
               </p>


            </Col>
         </Row>

         <hr className='my-5' />

      </>

   );
};

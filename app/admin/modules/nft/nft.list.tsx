import React from 'react';

import { AdminType } from '@/app/admin/types';
import { Button, Col, Row } from 'react-bootstrap';
import AdminList from '../../components/list';
import { AdminGetData } from '../../functions/get.data';
import { M } from '..';
import AdminNftImage from '../../components/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFileImport, faLink } from '@fortawesome/free-solid-svg-icons';
import AdminImage from '../../components/image';
import { AdminIcon } from '../../components/components';


export async function List(admin: AdminType) {

   const nft = await AdminGetData("admin/nft");
   const wallet = await AdminGetData("admin/wallet");
   const user = await AdminGetData("admin/user");
   const collection = await AdminGetData("admin/collection");
   const artwork = await AdminGetData("admin/artwork");

   const object = {
      wallet,
      user,
      collection,

   }


   return (
      <>
         <h1 className='text-center mb-5'>
            <AdminIcon name="nft" size={48} className='me-3' />
            NFT
         </h1>

         <p className='mb-3'>
            <M.Nft.Connect />
         </p>

         {wallet && wallet.length > 0 ? (
            <>
               <p>
                  <span className='me-3'>
                     Connected wallet:
                  </span>
                  {wallet.map((data: any, key: number) => (
                     <React.Fragment key={key}>
                        <AdminIcon key={key} name='wallet' size={24} className='me-1' />
                        <strong className='me-3'>
                           {data['walletAddress']}
                        </strong>
                     </React.Fragment>
                  ))}
               </p>
               <Button as="a" variant="primary" href="/admin/nft/show">
                  <FontAwesomeIcon icon={faFileImport} className="me-2" />
                  Show NFTs
               </Button>
            </>

         ) : null}

         <hr className='my-5' />


         {user['trialMintId'] ? (
            <>
               {nft.map((data: any, key: number) => (
                  data['id'] === user['trialMintId'] ? (
                     <M.Nft.Trialminted data={data} key={key} />
                  ) : null
               ))}
            </>
         ) : null}


         {nft ? (
            <>
               <h2>NFT Artworks</h2>
               <Row className='mb-5 g-4 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2'>
                  {nft.map((data: any, key: number) => (
                     data['artwork'] ? (
                        <Col key={key}>
                           {/* <AdminNftImage src={data['nftData'].id} alt={data['nftData'].name} width={100} height="auto" /> */}
                           <AdminImage src={`artwork/${data['artwork'].id}/thumbnail`} alt={data['name']} />
                           <p className='mt-3'>
                              <a href={`/admin/artwork/detail/${data['artwork'].id}`}>
                                 <AdminIcon name='artwork' size={24} className='me-1' />
                                 <strong>
                                    {data['artwork'].name}
                                 </strong>
                              </a>
                           </p>
                           <h5>{data['nftData'].name}</h5>

                           <p className='mt-3'>
                              <Button as="a" variant="primary" href={`/admin/nft/detail/${data['id']}`} className='mt-2'>
                                 NFT detail
                                 <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                              </Button>
                           </p>
                        </Col>
                     ) : null
                  ))}
               </Row>
               <hr className='my-5' />
            </>
         ) : null}

         {nft ? (
            <>
               <h2>Artworks to Mint NFT</h2>
               <Row className='mb-5 g-4 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2'>
                  {artwork.map((data: any, key: number) => (
                     data['nft'] ? null : (
                        <Col key={key}>
                           <AdminImage src={`artwork/${data['id']}/thumbnail`} alt={data['name']} />
                           <p className='mt-3'>
                              <a href={`/admin/artwork/detail/${data['id']}`}>
                                 <AdminIcon name='artwork' size={24} className='me-1' />
                                 <strong>
                                    {data['name']}
                                 </strong>
                              </a><br />
                              <AdminIcon name='artist' size={24} className='me-1' />
                              {data['artist'].name} <br />
                              <M.Nft.Mint admin={admin} data={data} collection={collection} />
                           </p>
                        </Col>
                     )))}
               </Row>
            </>
         ) : null}

      </>
   );
}





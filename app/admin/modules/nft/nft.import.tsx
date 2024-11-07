import React from 'react';

import { AdminType } from '@/app/admin/types';
import { Button, Col, Row } from 'react-bootstrap';
import AdminList from '../../components/list';
import { AdminGetData } from '../../functions/get.data';
import { M } from '..';
import { AdminNftImage } from '../../components/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faFileImport, faLink } from '@fortawesome/free-solid-svg-icons';
import AdminImage from '../../components/image';
import { AdminIcon } from '../../components/components';


export async function Import(admin: AdminType) {


   const wallet = await AdminGetData("admin/wallet");



   return (
      <>
         <h1 className='mb-3'>
            <AdminIcon name="nft" size={48} className='me-3' />
            NFT Import
         </h1>

         <hr className='my-5' />
         {wallet && wallet.map((wallet_item: any) => (
            <>
               <h2 className='mb-3'>
                  <AdminIcon name='wallet' size={32} className='me-2' />
                  <small>Wallet:</small> {wallet_item['walletAddress']}
               </h2>

               {<>
                  {wallet_item.collections && wallet_item.collections.map((collection_item: any) => (


                     collection_item['nfts'] && collection_item['nfts'].length > 0 ? (
                        <>
                           <h3 className='mb-3'>
                              <AdminIcon name='collection' size={32} className='me-2' />
                              <small>Collection:</small> {collection_item['colData'].name}
                           </h3>
                           <Row className='mb-5 border p-3'>
                              <Col xs="auto">
                                 <AdminNftImage src={collection_item['colData'].image} alt={collection_item['colData'].name} width={200} />
                              </Col>
                              <Col>
                                 {collection_item['colData'].metadata}
                              </Col>
                           </Row>

                           <Row className='mb-5 g-4 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2'>
                              {collection_item.nfts.map((data: any) => (
                                 data['artwork'] ? null : (
                                    <Col>
                                       <AdminNftImage src={data['nftData'].image} alt={data['nftData'].name} width={100} height="auto" />

                                       <p>
                                          <strong>
                                             {data['nftData'].name}
                                          </strong>
                                          <br />
                                          {data['nftData'].metadata}
                                       </p>

                                       <p className='mt-3'>
                                          <Button variant="primary" className='mt-2'>
                                             <FontAwesomeIcon icon={faFileImport} className="me-2" />
                                             Import NFT
                                          </Button>
                                       </p>
                                    </Col>
                                 )))}
                           </Row>
                           <hr className='my-5' />
                        </>
                     ) : null


                  ))}

                  {wallet_item.orphanNfts && wallet_item.orphanNfts.length > 0 ? (
                     <>
                        <h3 className='mb-3'>
                           Orphan NTF's
                        </h3>

                        <Row className='mb-5 g-4 row-cols-xl-6 row-cols-lg-5 row-cols-md-4 row-cols-sm-3 row-cols-2'>
                           {wallet_item.orphanNfts.map((data: any) => (
                              data['artwork'] ? null : (
                                 <Col>
                                    <AdminNftImage src={data['nftData'].image} alt={data['nftData'].name} width={100} height="auto" />

                                    <p>
                                       <strong>
                                          {data['nftData'].name}
                                       </strong>
                                       <br />
                                       {data['nftData'].metadata}
                                    </p>

                                    <p className='mt-3'>
                                       <Button as="a" variant="primary" href={`/admin/nft/detail/${data['id']}`} className='mt-2'>
                                          <FontAwesomeIcon icon={faFileImport} className="me-2" />
                                          Import NFT
                                       </Button>
                                    </p>
                                 </Col>
                              )))}
                        </Row>
                        <hr className='my-5' />
                     </>
                  ) : null}

               </>
               }
            </>
         ))}
      </>
   );
}





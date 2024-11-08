'use client'

import { faCheck, faHand, faLink, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal } from 'react-bootstrap';
import { AdminIcon } from '../../components/components';
import { AdminForm, AdminFormInput } from '../../components/form';
import { useState } from 'react';
import { AdminType } from '../../types';

// Dudo - tu daj komponent na mint trial minted

interface MintProps {
   admin: AdminType
   data: any;
   wallet: any;
   collection: any;
}

export const Mint: React.FC<MintProps> = ({ admin, data, collection }) => {

   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);



   let metadata = '';
   metadata += `Artist: ${data['artist'].name} \n`;
   metadata += `Year: ${data['year']} \n`;
   metadata += `Description: ${data['description']} \n`;
   metadata += `Tags: ${data['tags']} \n`;
   metadata += `Genre: ${data['artworkGenre'].name} \n`;
   metadata += `Worktype: ${data['artworkWorktype'].name} \n`;
   metadata += `Material: ${data['artworkMaterial'].name} \n`;
   metadata += `Technique: ${data['artworkTechnique'].name} \n`;
   metadata += `Measurements: ${data['measurements']} \n`;

   const option = collection.map((data: any) => {
      return {
         id: data.colData.id,
         name: `wallet: ${data.walletId} - collection: ${data.colData.name}`
      }
   });

   console.log("Mint option", option);

   return (
      <>
         <Button variant="secondary" className='mt-2' onClick={handleShow}>
            <FontAwesomeIcon icon={faLink} className="me-2" />
            Mint NFT
         </Button>

         <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>
                  <AdminIcon name="nft" className='me-2' size={36} />
                  Mint NFT
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>

               <AdminForm admin={admin} method="POST" endpoint={`/nft/create/collection/:collectionId/artwork/:artworkId`} onSuccess={handleClose}>

                  <AdminFormInput type="parent" icon="collection" label="Collection" name="collection" value="" option={option} required />
                  <AdminFormInput type="tinytext" icon="field" label="Name" name="name" value={data['name']} required />
                  <AdminFormInput type="longtext" icon="textarea" label="Description" name="description" value={metadata} />
               </AdminForm>

            </Modal.Body>
            <Modal.Footer>
               <Button variant="success" form="form" type="submit">
                  <FontAwesomeIcon icon={faCheck} fixedWidth className='me-1' />
                  Save
               </Button>
            </Modal.Footer>
         </Modal>



      </>
   );
};

'use client'

import { faCheck, faFileImport, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AdminForm, AdminFormInput } from '../../components/form';
import { AdminIcon } from '../../components/components';
import { AdminType } from '../../types';
import { M } from '..';
import { AdminNftImage } from '../../components/image';
import AdminDetail from '../../components/detail';

// Dudo - tu je komponent na import NFT

interface MintProps {
   admin: AdminType
   data: { [key: string]: any };
   option?: {
      [key: string]: Array<{ id: string, name: any }>;
   };
}

export const Import: React.FC<MintProps> = ({ admin, data, option }) => {


   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <>
         <Button variant="primary" className='mt-2' onClick={handleShow}>
            <FontAwesomeIcon icon={faFileImport} className="me-2" />
            Import NFT
         </Button>

         <Modal size="lg" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>
                  <AdminIcon name="nft" className='me-2' size={36} />
                  Import NFT
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>

               <AdminForm admin={admin} method="POST" endpoint={`/admin/artwork/create`} onSuccess={handleClose}>

                  <AdminFormInput type="tinytext" icon="field" label="Name" name="name" value={data['name']} required />
                  <AdminFormInput type="longtext" icon="textarea" label="Description" name="description" value={data['description']} />
                  <AdminFormInput type="tinytext" icon="tags" label="Tags" name="tags" value={data['tags']} />
                  <AdminFormInput type="parent" icon="artist" label="Artist" name="artistId" value={data['artist']?.id ?? ''} option={option?.["artist"]} required />

                  {/* 
                  
                     <AdminFormInput type="image" icon="artwork" label="Image" name="image" value={data['id']} /> 
                     
                     tu je <input type="file"> pre obrazok, ale to neviem ako spravit aby sa tam vlozilo z URL obrazku binary data
                     to musim robit niekde pri append formData pred posielanim requestu
                  
                  */}

                  <AdminDetail.Row icon="artwork" name="Image">
                     <a href={data['image']} target='_blank'>
                        <img src={data['image']} alt={data['name']} width={300} loading="lazy" />
                     </a>
                  </AdminDetail.Row>

                  <AdminFormInput type="tinytext" icon="date" label="Year" name="year" value={data['year']} required />
                  <AdminFormInput type="parent" icon="art" label="Genre" name="artworkGenreId" value={data['artworkGenre']?.["id"] ?? ''} option={option?.['artwork_genre']} required />
                  <AdminFormInput type="parent" icon="worktype" label="Worktype" name="artworkWorktypeId" value={data['artworkWorktype']?.id ?? ''} option={option?.["artwork_worktype"]} required />
                  <AdminFormInput type="parent" icon="paper" label="Material" name="artworkMaterialId" value={data['artworkMaterial']?.id ?? ''} option={option?.["artwork_material"]} required />
                  <AdminFormInput type="parent" icon="palette" label="Technique" name="artworkTechniqueId" value={data['artworkTechnique']?.id ?? ''} option={option?.["artwork_technique"]} required />
                  <AdminFormInput type="tinytext" icon="measurements" label="Measurements" name="measurements" value={data['measurements']} />
                  <AdminFormInput type="boolean" icon="question" label="Public" name="public" value={data['public']} />
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

import React from 'react';

import Image from 'next/image';

import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';

type Props = {
   admin: AdminType;
   data: any;
};


const Table: React.FC<Props> = ({ admin, data }) => {

   const columns = [
      { name: "Name" },
      { name: "Year" },
      { name: "Artist" },
      { name: "Image" },
      { name: "NFT" },
      { name: "AI" },
      { name: "Active" }
   ];

   return (
      <A.Table columns={columns}>

         {data.map((object: any) => (

            <A.TableRow data={object} admin={admin} key={object['id']}>

               <A.TableColumn>
                  <strong>
                     <A.LinkIcon admin={{ module: "artwork", action: "detail", unique: object['id'] }}>
                        {object['name']}
                     </A.LinkIcon>
                  </strong>
               </A.TableColumn>

               <A.TableColumn>
                  {object['year']}
               </A.TableColumn>

               <A.TableColumn>
                  <A.LinkIcon admin={{ module: "artist", action: "detail", unique: object['artist']['id'] }}>
                     {object['artist']['name']}
                  </A.LinkIcon>
               </A.TableColumn>

               <A.TableColumn>
                  <A.Image src={`artwork/${object['id']}/thumbnail`} alt={object['name']} width={100} height="auto" type="thumbnail" />
               </A.TableColumn>



               <A.TableColumn>
                  {object['nft'] ? <span className='badge bg-dark'>NFT</span> : null}

               </A.TableColumn>

               <A.TableColumn>
                  {object['ai'] ? <span className='badge bg-dark'>AI</span> : null}
               </A.TableColumn>

               <A.TableColumn>
                  <A.Boolean value={object['active']} />
               </A.TableColumn>

            </A.TableRow>

         ))}

      </A.Table>
   );
};


export default Table;
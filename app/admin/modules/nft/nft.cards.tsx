import React from 'react';

import { Col, Row } from 'react-bootstrap';
import { AdminCard } from '../../components/cards';
import { AdminType } from '../../types';

type Props = {
   admin: AdminType;
   data: any;
};


const Cards: React.FC<Props> = ({ admin, data }) => {


   return (
      <>
         <Row className='g-3'>

            {data.map((object: any) => (
               <Col key={object['id']} md={3}>
                  <AdminCard data={object} admin={admin} key={object['id']} />
               </Col>

            ))}
         </Row>

      </>

   );
};


export default Cards;
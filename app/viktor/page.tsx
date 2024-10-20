'use server'

import type { Metadata } from "next";
import Image from "next/image";
import { Container, Row, Col } from 'react-bootstrap';

import { V } from '@/app/viktor';


export default async function Viktor() {

  return (
    <>

      <Container className='py-5 '>
        <h1>E.V.A. Gallery</h1>
        <p className="lead">Galleries have always occupied a significant position bridging artists and art enthusiasts.</p>
        <p>The mission of E.V.A. Gallery is to redefine this dynamic through a universal digital platform. Here, artists can establish their own gallery spaces and exhibitions, while digital visitors can seamlessly explore them.</p>
        <p>Objectives:</p>
        <ul>
          <li>Establish a singular, inclusive space where diverse artists can digitally showcase their work, while visitors can navigate through an array of digital galleries and exhibitions.</li>
          <li>Integrate web3 NFTs into the platform, enabling the creation of hybrid digitalized and NFT exhibitions.</li>
          <li>Enhance the platform with an AI assistant capable of guiding visitors in their search for art based on specific preferences and interests.</li>
        </ul>
        <p>For further information and comprehensive details, please refer to our wiki.</p>

        <hr />

        <V.Login />

      </Container>

    </>

  );
}

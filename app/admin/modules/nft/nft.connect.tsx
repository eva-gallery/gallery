"use client";

import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { useState } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { Keyring } from "@polkadot/keyring";
import { AdminGetData } from '../../functions/get.data';

export const Connect: React.FC = () => {
   const [account, setAccount] = useState<string | null>(null);
   const [showAccountSelect, setShowAccountSelect] = useState(false);
   const [overlay, setOverlay] = useState<JSX.Element | null>(null);

   const connectWallet = async () => {
      const extensions = await web3Enable('Eva gallery');
      const accounts = await web3Accounts();

      if (extensions.length === 0 || accounts.length === 0) {
         setOverlay(
            <Popover id="no-accounts-popover">
               <Popover.Header>No Accounts Found</Popover.Header>
               <Popover.Body>
                  Connect your Kusama wallet to interact with NFTs. 
                  You need to have the Kusama wallet extension in your browser and have an wallet created and connected.
                  <br />
                  <a 
                     href="https://github.com/eva-gallery/gallery/blob/main/docs/wallet_creation.md" 
                     target="_blank" 
                     rel="noopener noreferrer"
                  >
                     More information on how to create a Kusama wallet here.
                  </a>
               </Popover.Body>
            </Popover>
         );
         setShowAccountSelect(true);
         return;
      }

      if (accounts.length > 1) {
         //Save wallets to the account
         //Communicate with BE to get the metadata to DB
         const keyring = new Keyring();

         const overlay = (
            <Popover id="account-select-popover">
               <Popover.Header>Select from synced accounts</Popover.Header>
               <Popover.Body>
                  {accounts.map((acc, index) => (
                     <Button
                        key={keyring.encodeAddress(acc.address, 2)}
                        variant="outline-dark"
                        className="d-block mb-2 w-100 text-start"
                        onClick={async () => {
                           setAccount(keyring.encodeAddress(acc.address, 2));
                           setShowAccountSelect(false);

                           setOverlay(
                              <Popover id="fetching-data-popover">
                                 <Popover.Header>Fetching Data</Popover.Header>
                                 <Popover.Body>
                                    <div className="d-flex align-items-center">
                                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                       Fetching wallet NFTs and Collection, please wait...
                                    </div>
                                 </Popover.Body>
                              </Popover>
                           );
                           setShowAccountSelect(true);
                              let GenericToKusama = keyring.encodeAddress(acc.address, 2)
                              await AdminGetData(`metadata/colmeta/address/${GenericToKusama}`);
                              await new Promise(resolve => setTimeout(resolve, 2000)); // 1 second delay
                              await AdminGetData(`metadata/nftmeta/address/${GenericToKusama}`);
                           setOverlay(
                              <Popover id="success-popover">
                                 <Popover.Header>Success</Popover.Header>
                                 <Popover.Body>
                                    <div className="d-flex align-items-center text-success">
                                       <span className="me-2">✓</span>
                                       Wallet data successfully loaded!
                                    </div>
                                 </Popover.Body>
                              </Popover>
                           );
                           setShowAccountSelect(true);
                           setTimeout(() => {
                              setShowAccountSelect(false);
                              setOverlay(null);
                           }, 2000);
                        }}
                     >
                        {acc.meta.name || `Account ${index + 1}`}: {keyring.encodeAddress(acc.address, 2)}
                     </Button>
                  ))}
               </Popover.Body>
            </Popover>
         );
         setShowAccountSelect(true);
         setOverlay(overlay);

      } else if (accounts.length === 1) {
         const keyring = new Keyring();
         const GenericToKusama = keyring.encodeAddress(accounts[0].address, 2);
         setOverlay(
            <Popover id="fetching-data-popover">
               <Popover.Header>Fetching Data</Popover.Header>
               <Popover.Body>
                  <div className="d-flex align-items-center">
                     <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                     Fetching wallet NFTs and Collection, please wait...
                  </div>
               </Popover.Body>
            </Popover>
         );
         setShowAccountSelect(true);
         await AdminGetData(`metadata/colmeta/address/${GenericToKusama}`);
         await new Promise(resolve => setTimeout(resolve, 2000));
         await AdminGetData(`metadata/nftmeta/address/${GenericToKusama}`);
         setOverlay(
            <Popover id="success-popover">
               <Popover.Header>Success</Popover.Header>
               <Popover.Body>
                  <div className="d-flex align-items-center text-success">
                     <span className="me-2">✓</span>
                     Wallet data successfully loaded!
                  </div>
               </Popover.Body>
            </Popover>
         );
         setTimeout(() => {
            setShowAccountSelect(false);
            setOverlay(null);
         }, 2000);
         setAccount(accounts[0].address);
      }
   };

   return (
      <div className="d-flex align-items-center position-relative">
         <OverlayTrigger
         show={showAccountSelect}
         overlay={overlay || <></>}
         placement="bottom"
         >
         <div>
            <Button variant="dark" onClick={connectWallet} className="me-2">
               <FontAwesomeIcon icon={faWallet} className='me-2' />
               Connect Kusama Wallet
            </Button>
         </div>
         </OverlayTrigger>
         <OverlayTrigger
         placement="right"
         overlay={
            <Popover id="wallet-creation-guide-popover">
               <Popover.Header>Connecting your Kusama wallet</Popover.Header>
               <Popover.Body>
                  The connect your Kusama wallet lets you to connect your Kusama wallet so you can interact with your NFT artwork. Click on this information button if you need guidance on how to create Kusama wallet.
               </Popover.Body>
            </Popover>
         }
         >

         <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={() => {
               if (typeof window !== 'undefined') {
                  window.open('https://github.com/eva-gallery/gallery/blob/main/docs/wallet_creation.md', '_blank', 'noopener noreferrer');
               }
            }}
         >
            <span>ⓘ</span>
         </Button>
         </OverlayTrigger>
         
         {account && <div className="mb-0 ms-3">Selected wallet: {account}</div>}
      </div>
   );
};
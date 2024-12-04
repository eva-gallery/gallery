"use client";

import { faCircle, faCircleInfo, faExternalLink, faInfo, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popover, OverlayTrigger, Modal } from 'react-bootstrap';
import { useState, createContext, useContext } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { Keyring } from "@polkadot/keyring";
import { AdminGetData, AdminPutData } from '../../functions/get.data';
import ConnectedWallets from './nft.wallets';
interface AccountContextProps {
   account: string | null;
   setAccount: React.Dispatch<React.SetStateAction<string | null>>;
   accountAddr: string | null;
   setAddr: React.Dispatch<React.SetStateAction<string | null>>;
}

const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const useAccount = () => {

   const context = useContext(AccountContext);
   if (!context) {
      throw new Error('useAccount must be used within an AccountProvider');
   }
   return context;
};

import { useEffect } from 'react';

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [account, setAccount] = useState<string | null>(null);
   const [accountAddr, setAddr] = useState<string | null>(null);

   useEffect(() => {
      const storedAccount = localStorage.getItem('account');
      const storedAccountAddr = localStorage.getItem('accountAddr');

      if (storedAccount) setAccount(storedAccount);
      if (storedAccountAddr) setAddr(storedAccountAddr);

   }, []);

   useEffect(() => {
      if (account) localStorage.setItem('account', account);
      if (accountAddr) localStorage.setItem('accountAddr', accountAddr);
   }, [account, accountAddr]);

   return (
      <AccountContext.Provider value={{ account, setAccount, accountAddr, setAddr }}>
         {children}
      </AccountContext.Provider>
   );
};

export const Connect: React.FC = () => {
   const { account, setAccount } = useAccount();
   const [showAccountSelect, setShowAccountSelect] = useState(false);
   const [overlay, setOverlay] = useState<JSX.Element | null>(null);
   const { setAddr } = useAccount();



   const connectWallet = async () => {
      let extensions: any[] = [];
      let accounts: any[] = [];
      if (typeof window !== 'undefined') {
         extensions = await web3Enable('Eva gallery');
         accounts = await web3Accounts();
      }

      if (extensions.length === 0 || accounts.length === 0) {

         handleShow();
         setShowAccountSelect(true);
         return;
      }

      const keyring = new Keyring();

      if (accounts.length > 1) {
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
                           const selectedAccount = keyring.encodeAddress(acc.address, 2);
                           setAddr(acc.address);

                           setShowAccountSelect(false);
                           try {
                              await AdminPutData("nft/create/wallet/" + selectedAccount);
                           } catch (error) {
                              console.error('Error creating wallet:', error);
                           }
                           setAccount(selectedAccount);

                           setOverlay(
                              <Popover id="fetching-data-popover">
                                 <Popover.Header>Fetching Data</Popover.Header>
                                 <Popover.Body>
                                    <div className="d-flex align-items-center">
                                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                       Loading wallet, please wait...
                                    </div>
                                 </Popover.Body>
                              </Popover>
                           );
                           setShowAccountSelect(true);
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
         const selectedAccount = keyring.encodeAddress(accounts[0].address, 2);
         setAddr(accounts[0].address);
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
         setAccount(selectedAccount);

         setTimeout(() => {
            setShowAccountSelect(false);
            setOverlay(null);
         }, 2000);
      }
   };

   const [show, setShow] = useState(false);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <div className="d-flex flex-column align-items-start position-relative">
         <div className="d-flex align-items-center">
            <OverlayTrigger
               show={showAccountSelect}
               overlay={overlay || <></>}
               placement="bottom"
            >
               <div>
                  {account && <Button variant="dark" onClick={async () => {
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
                     await AdminGetData(`metadata/colmeta/address/${account}`);
                     await new Promise(resolve => setTimeout(resolve, 2000));
                     await AdminGetData(`metadata/nftmeta/address/${account}`);
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
                  }} className="me-2">
                     <FontAwesomeIcon icon={faWallet} className='me-2' />
                     Fetch Wallet NFTs
                  </Button>}
                  <Button variant="dark" onClick={connectWallet} className="me-2">
                     <FontAwesomeIcon icon={faWallet} className='me-2' />
                     {account ? `${account.slice(0, 5)}...${account.slice(-5)}` : 'Connect Kusama Wallet'}
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                     <Modal.Header closeButton> <h5 className='mb-0'>No Accounts Found</h5> </Modal.Header>
                     <Modal.Body>
                        <p>
                           Connect your Kusama wallet to interact with NFTs.
                           You need to have the Kusama wallet extension in your browser and have a wallet created and connected.
                        </p>
                        <p>
                           <a className="btn btn-primary"
                              href="https://github.com/eva-gallery/gallery/blob/main/docs/wallet_creation.md"
                              target="_blank"
                              rel="noopener noreferrer">
                              More information on how to create a Kusama wallet here.
                              <FontAwesomeIcon icon={faExternalLink} className='ms-2' />
                           </a>
                        </p>
                     </Modal.Body>
                  </Modal>
               </div>
            </OverlayTrigger>
            <OverlayTrigger
               placement="right"
               overlay={
                  <Popover id="wallet-creation-guide-popover">
                     <Popover.Header>Connecting your Kusama wallet</Popover.Header>
                     <Popover.Body>
                        Connect your Kusama wallet to interact with your NFT artwork. Click on this information button if you need guidance on how to create Kusama wallet.
                     </Popover.Body>
                  </Popover>
               }
            >
               <Button
                  variant="primary"
                  onClick={() => {
                     if (typeof window !== 'undefined') {
                        window.open('https://github.com/eva-gallery/gallery/blob/main/docs/wallet_creation.md', '_blank', 'noopener noreferrer');
                     }
                  }}
               >
                  <FontAwesomeIcon icon={faCircleInfo} />
               </Button>
            </OverlayTrigger>
         </div>
         <div className="mt-3">
            <ConnectedWallets selectedAccount={account ?? undefined} />
         </div>
      </div>
   );
};

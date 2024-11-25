"use client";

import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { useState, createContext, useContext } from 'react';
import { web3Enable, web3Accounts, web3FromAddress } from '@polkadot/extension-dapp';
import { Keyring } from "@polkadot/keyring";
import { AdminGetData } from '../../functions/get.data';
import { InjectedExtension } from '@polkadot/extension-inject/types';

interface AccountContextProps {
   account: string | null;
   setAccount: React.Dispatch<React.SetStateAction<string | null>>;
   accountAddr: string | null;
   setAddr: React.Dispatch<React.SetStateAction<string | null>>;
   injector: InjectedExtension;
   setInjector: React.Dispatch<React.SetStateAction<any>>;
}

const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const useAccount = () => {
   
   const context = useContext(AccountContext);
   if (!context) {
      throw new Error('useAccount must be used within an AccountProvider');
   }
   return context;
};

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
   const [account, setAccount] = useState<string | null>(null);
   const [injector, setInjector] = useState<any>(null);
   const [accountAddr, setAddr] = useState<string | null>(null);



   return (
      <AccountContext.Provider value={{ account, setAccount, injector, setInjector, accountAddr, setAddr }}>
         {children}
      </AccountContext.Provider>
   );
};

export const Connect: React.FC = () => {
   const { account, setAccount } = useAccount();
   const { setInjector } = useAccount();
   const [showAccountSelect, setShowAccountSelect] = useState(false);
   const [overlay, setOverlay] = useState<JSX.Element | null>(null);
   const { setAddr } = useAccount();

   const connectWallet = async () => {
      const extensions = await web3Enable('Eva gallery');
      const accounts = await web3Accounts();
      if (extensions.length === 0 || accounts.length === 0) {
         setOverlay(
            <Popover id="no-accounts-popover">
               <Popover.Header>No Accounts Found</Popover.Header>
               <Popover.Body>
                  Connect your Kusama wallet to interact with NFTs. 
                  You need to have the Kusama wallet extension in your browser and have a wallet created and connected.
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
                           setAccount(selectedAccount);
                           const signer = await web3FromAddress(acc.address);
                           setAddr(acc.address);
                           setInjector(signer);
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
                           await AdminGetData(`metadata/colmeta/address/${keyring.encodeAddress(acc.address, 2)}`);
                           await new Promise(resolve => setTimeout(resolve, 2000)); 
                           await AdminGetData(`metadata/nftmeta/address/${keyring.encodeAddress(acc.address, 2)}`);
                           
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
         const signer = await web3FromAddress(accounts[0].address);
         setAddr(accounts[0].address);
         setInjector(signer);
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

         await AdminGetData(`metadata/colmeta/address/${selectedAccount}`);
         await new Promise(resolve => setTimeout(resolve, 2000));
         await AdminGetData(`metadata/nftmeta/address/${selectedAccount}`);

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

         setAccount(selectedAccount);
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
                  Connect your Kusama wallet to interact with your NFT artwork. Click on this information button if you need guidance on how to create Kusama wallet.
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

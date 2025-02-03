'use client'

import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, ToggleButton, ButtonGroup, OverlayTrigger, Popover } from 'react-bootstrap';
import { AdminIcon } from '../../components/components';
import { AdminFormInput } from '../../components/form';
import { useState } from 'react';
import { AdminType } from '../../types';
import { AdminGetData, AdminPutData } from '../../functions/get.data';
import { useAccount } from './nft.connect';
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';

interface MintProps {
   admin: AdminType;
   data: any;
   wallet: any;
   collection: any;
}

export const Mint: React.FC<MintProps> = ({ admin, data, collection }) => {
   const { account, accountAddr } = useAccount();

   const [show, setShow] = useState(false);
   const [mintMode, setMintMode] = useState('trial'); // 'trial' or 'regular'
   const [wallets, setWallets] = useState([]);
   const [loading, setLoading] = useState(false);
   const [options, setOptions] = useState([]);

   const handleClose = () => setShow(false);
   const handleShow = async () => {
      const fetchedWallets = await AdminGetData("admin/wallet");
      const fetchedCollections = await AdminGetData("admin/collection");
      const mappedWallets = fetchedWallets.map((data: any) => ({
         id: data.id,
         name: `address: ${data.walletAddress}`,
      }));
      setWallets(mappedWallets);

      // Select only collections that belong to the selected wallet - accountAddr  
      //Find accountAddr in fetchedWallets and get its id
      let option = [];
      if (account) {
         let walletId = null;
         for (let i = 0; i < fetchedWallets.length; i++) {
            if (fetchedWallets[i].walletAddress === account) {
               walletId = fetchedWallets[i];
            }
         }
         if (walletId) {
            option = fetchedCollections
               .filter((data: any) => data.walletId === walletId.id)
               .map((data: any) => ({
                  id: data.colData.id,
                  name: `collection: ${data.colData.name}, id: ${data.colData.id}`,
               }));
         }
      }
      setOptions(option);
      setShow(true);
   };

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
                  Mint NFT from {data.name} artwork
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <ButtonGroup className="mb-4 w-100">
                  <ToggleButton
                     id="toggle-trial"
                     type="radio"
                     variant={mintMode === 'trial' ? 'primary' : 'outline-primary'}
                     name="mintMode"
                     value="trial"
                     checked={mintMode === 'trial'}
                     onChange={(e) => setMintMode(e.currentTarget.value)}
                  >
                     Trial Mint
                  </ToggleButton>
                  <ToggleButton
                     id="toggle-regular"
                     type="radio"
                     variant={mintMode === 'regular' ? 'primary' : 'outline-primary'}
                     name="mintMode"
                     value="regular"
                     checked={mintMode === 'regular'}
                     onChange={(e) => setMintMode(e.currentTarget.value)}
                  >
                     Regular Mint
                  </ToggleButton>
               </ButtonGroup>

               {mintMode === 'regular' && (
                    <>
                      {account && collection && (
                        <>
                           {options.length > 0 && (
                             <AdminFormInput
                              type="parent"
                              icon="collection"
                              label="Collection to mint into:"
                              name="collection"
                              value=""
                              option={options}
                              required
                             />
                           )}
                           {options.length === 0 && (
                            <div className="text-danger mt-1" style={{ cursor: 'help' }} title="You need to create a collection first before minting NFTs">
                              <small>
                               <i className="fas fa-exclamation-circle me-1"></i>
                               No collections found - Create a collection first
                              </small>
                            </div>
                           )}
                        </>
                      )}
                      <p>
                        <strong>Connected Account:</strong> {account || "No account connected"}
                      </p>
                      {!account && (
                        <small className="text-muted d-block">
                           <i className="fas fa-info-circle me-1"></i>
                           Please connect your wallet in connect Kusama wallet button first to mint NFTs.
                        </small>
                      )}
                    </>
 
               )}

               {mintMode === 'trial' && (
                  <p>
                     You are about to mint this NFT for free through Eva Gallery.
                     You can mint 1 artwork like this for free.
                  </p>
               )}
            </Modal.Body>
            <Modal.Footer>
               {mintMode === 'regular' && (
                 <OverlayTrigger
                   placement="left"
                   overlay={
                     <Popover id="take-ownership-guide">
                        <Popover.Header as="h3">Creating a new NFT Collection</Popover.Header>
                        <Popover.Body>
                           Your NFTs need to be in a collection in order for you to be able to mint them. Think of collections as folders and of NFTs as file you store in folders. <b>NOTE: Make sure to fetch your wallet data via &quot;Fetch wallet Collections & NFTs&quot; button again after new collection is minted in order for it to appear in selector. </b>
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
                     className="ms-2"
                   >
                     <span>ⓘ</span>
                   </Button>
                 </OverlayTrigger>
               )}
                  {mintMode === 'regular' && (
                  <Button 
                   variant="secondary" 
                   className='mt-2 ms-2' 
                   onClick={() => {
                    if (!accountAddr) {
                     alert('Please sign in with your Kusama wallet first.');
                     return;
                    }
                    const collectionNameInput = document.createElement('input');
                    collectionNameInput.type = 'text';
                    collectionNameInput.placeholder = 'Enter collection name';
                    collectionNameInput.className = 'form-control mb-3';
                    
                    const createButton = document.createElement('button');
                    createButton.textContent = 'Create New Collection';
                    createButton.className = 'btn btn-primary mb-3';
                    
                    const existingInput = document.querySelector('.collection-name-input');
                  const existingButton = document.querySelector('.create-collection-btn');

                  // Add click event listener to create button
                  createButton.addEventListener('click', async () => {
                     try {
                        if (!accountAddr) {
                          alert('Please sign in with your Kusama wallet first.');
                          return;
                        }

                        const collectionName = collectionNameInput.value;
                        if (!collectionName) {
                          alert('Please enter a collection name');
                          return;
                        }
                        setLoading(true);

                        const artworkId = data.id;

                        const tx = await AdminPutData(`collection/create/`, { name: collectionName, address: account });

                        console.log(tx)
                        // Sign and submit transaction and listen for events
                        const wsProvider = new WsProvider("wss://kusama-asset-hub-rpc.polkadot.io");
                        const api = await ApiPromise.create({ provider: wsProvider });
                        const callData = tx.callData;
                        const nftTX = api.tx(callData);
                        const nftTXargs = nftTX.args[0].toHuman();

                        if (!nftTXargs || !Array.isArray(nftTXargs)) {
                         setLoading(false);
                          throw new Error('Invalid transaction arguments');
                        }

                        const txArg = nftTXargs[1] as { args: { item: string, collection: string, data: string } };
                        let nftID = txArg.args.item;
                        let colID = txArg.args.collection;
                        let nftData = txArg.args.data;
                        let injector;
                        if (typeof window !== 'undefined') {
                          await web3Enable('Eva gallery');
                          injector = await web3FromAddress(accountAddr)
                        }
                        if (!account || !injector) {
                          setLoading(false);
                          alert("Account or wallet injector not found");
                          return;
                        }

                        let call = api.tx(callData);
                        await call.signAndSend(accountAddr, { signer: injector.signer }, async ({ status, txHash, dispatchError }) => {
                          if (status.isFinalized) {
                            setLoading(false);
                            if (dispatchError) {
                               if (dispatchError.isModule) {
                                 const decoded = api.registry.findMetaError(dispatchError.asModule);
                                 const { docs, name, section } = decoded;
                                 console.error(`${section}.${name}: ${docs.join(" ")}`);
                                 alert(`${section}.${name}: ${docs.join(" ")}`);
                               } else {
                                 console.error(dispatchError.toString());
                                 alert(dispatchError.toString());
                               }
                            } else {
                               await AdminPutData(`nft/create/id/${colID + "-" + nftID}/wallet/${account}/artwork/${artworkId}`, { ipfsLink: nftData });
                               alert('NFT was minted successfully. It should appear in online checks in a few minutes.');
                               window.location.reload();
                            }
                            handleClose();
                          }
                        });
                      } catch (error) {
                        setLoading(false);
                        alert(`Minting failed: ${error}`);
                      }
                  });


                    if (existingInput) {
                     existingInput.remove();
                    }
                    if (existingButton) {
                     existingButton.remove();
                    }
                    
                    const modalBody = document.querySelector('.modal-body');
                    if (modalBody) {
                     collectionNameInput.className = 'form-control mb-3 collection-name-input';
                     createButton.className = 'btn btn-primary mb-3 create-collection-btn';
                     modalBody.appendChild(collectionNameInput);
                     modalBody.appendChild(createButton);
                    }
                   }}
                  >
                   Create new collection for NFTs
                  </Button>
                  )}
               {mintMode === 'trial' ? (
                  <Button variant="primary" onClick={async () => {
                     try {
                        setLoading(true);
                        const artworkId = data.id;
                        const response = await AdminPutData(`mint/trial/artwork/${artworkId}`, {})
                        setLoading(false);
                        if (response.status === 'MintedAlready') {
                           alert('NFT has already been minted, only one allowed per account.');
                        }
                        else if (response.status === 'Success') {
                           alert('NFT was minted successfully. It should appear in the trial mint section soon.');
                           window.location.reload();
                        } else {
                           throw new Error('Minting failed');
                        }
                     } catch (error) {
                        setLoading(false);
                        console.error('Minting failed:', error);
                        alert('Minting failed. Please try again.');
                     }
                  }}>
                     {loading ? (
                        <>
                           <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                           Minting...
                        </>
                     ) : (
                        'Trial Mint'
                     )}
                  </Button>
               ) : (
                      <Button
                        variant="primary"
                        disabled={!account || options.length === 0}
                        onClick={async () => {
                           try {
                             if (!accountAddr) {
                               alert('Please sign in with your Kusama wallet first.');
                               return;
                             }

                             setLoading(true);
                             const collectionElement = document.querySelector('[name="collection"]') as HTMLSelectElement;
                             if (!collectionElement) throw new Error('Collection element not found');

                             if (!collectionElement.value) {
                               alert('Please select a collection to mint into');
                               setLoading(false);
                               return;
                             }

                             const artworkId = data.id;

                             const tx = await AdminPutData(`nft/create/collection/${collectionElement.value}/artwork/${artworkId}`, { address: account });
                             // Sign and submit transaction and listen for events
                             const wsProvider = new WsProvider("wss://kusama-asset-hub-rpc.polkadot.io");
                             const api = await ApiPromise.create({ provider: wsProvider });
                             const callData = tx.callData;
                             const nftTX = api.tx(callData);
                             const nftTXargs = nftTX.args[0].toHuman();

                             if (!nftTXargs || !Array.isArray(nftTXargs)) {
                              setLoading(false);
                               throw new Error('Invalid transaction arguments');
                             }

                             const txArg = nftTXargs[1] as { args: { item: string, collection: string, data: string } };
                             let nftID = txArg.args.item;
                             let colID = txArg.args.collection;
                             let nftData = txArg.args.data;
                             let injector;
                             if (typeof window !== 'undefined') {
                               await web3Enable('Eva gallery');
                               injector = await web3FromAddress(accountAddr)
                             }
                             if (!account || !injector) {
                               setLoading(false);
                               alert("Account or wallet injector not found");
                               return;
                             }

                             let call = api.tx(callData);
                             await call.signAndSend(accountAddr, { signer: injector.signer }, async ({ status, txHash, dispatchError }) => {
                               if (status.isFinalized) {
                                 setLoading(false);
                                 if (dispatchError) {
                                    if (dispatchError.isModule) {
                                      const decoded = api.registry.findMetaError(dispatchError.asModule);
                                      const { docs, name, section } = decoded;
                                      console.error(`${section}.${name}: ${docs.join(" ")}`);
                                      alert(`${section}.${name}: ${docs.join(" ")}`);
                                    } else {
                                      console.error(dispatchError.toString());
                                      alert(dispatchError.toString());
                                    }
                                 } else {
                                    await AdminPutData(`nft/create/id/${colID + "-" + nftID}/wallet/${account}/artwork/${artworkId}`, { ipfsLink: nftData });
                                    alert('NFT was minted successfully. It should appear in online checks in a few minutes.');
                                    window.location.reload();
                                 }
                                 handleClose();
                               }
                             });
                           } catch (error) {
                             setLoading(false);
                             alert(`Minting failed: ${error}`);
                           }
                        }}
                      >
                        {loading ? (
                           <>
                             <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                             Minting...
                           </>
                        ) : (
                           'Sign & Submit Transaction'
                        )}
                      </Button>
               )}
            </Modal.Footer>
         </Modal>
      </>
   );
};

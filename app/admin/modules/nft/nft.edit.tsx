'use client';
import React from 'react';
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import AdminDetail from '../../components/detail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { AdminGetData, AdminPutData } from '../../functions/get.data';
import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from "@polkadot/api";

const NftEdit: React.FC<{ description: string; name: string; id: string, artworkId: string }> = ({ description, name, id, artworkId }) => {
    const [newName, setNewName] = React.useState(name);
    const [newDescription, setNewDescription] = React.useState(description);
    const [loading, setLoading] = React.useState(false);
    return (
        <div>
            <hr className='my-5' />
            <AdminDetail.Row icon="field" name="Edit NFT details">
            <Button 
                className="btn btn-success" 
                onClick={() => {
                const form = document.getElementById('edit-form');
                if (form) {
                    form.style.display = form.style.display === 'none' ? 'block' : 'none';
                }
                }}
            >
                Edit
                <FontAwesomeIcon icon={faEdit} className="ms-2" />
            </Button>
            <OverlayTrigger
                placement="right"
                overlay={
                <Popover id="take-ownership-guide">
                    <Popover.Header as="h3">Editing your artwork</Popover.Header>
                    <Popover.Body>
                    You can edit your artwork&apos;s on-chain details to reflect what you desire. Keep in mind, that this only edits the on-chain details and not the artwork itself.
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
            <div id="edit-form" style={{ display: 'none', marginTop: '20px' }}>
                <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        value={newName} 
                        onChange={(e) => setNewName(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea 
                        className="form-control" 
                        id="description" 
                        rows={3} 
                        style={{ resize: 'vertical', width: '100%' }} 
                        value={newDescription} 
                        onChange={(e) => setNewDescription(e.target.value)} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={async (e) => {
                        e.preventDefault();
                        try{
                        const account = localStorage.getItem('account');
                        const accountAddr = localStorage.getItem('accountAddr');
                        setLoading(true);

                        //If description is the same as the new description, do not update
                        if (description === newDescription && name === newName) {
                            alert("No changes were made to the inputs, please make changes to update");
                            setLoading(false);
                            return;
                        }
                        

                        //Also see if wallet is connected
                        if (!accountAddr) {
                            alert("Please connect your wallet first");
                            setLoading(false);
                            return;
                        }
                        let injector;
                        if (typeof window !== 'undefined') {
                            await web3Enable('Eva gallery');
                            //Find account that is same as accountAddr
                            injector = await web3FromAddress(accountAddr)
                        }
                        if (!injector) {
                            alert("Failed to get web3 injector");
                            setLoading(false);
                            return;
                        }
                        //check if account is not found
                        if (!account) {
                            alert("Account not found");
                            setLoading(false);
                            return;
                        }

                        //Check if account is owner of the artwork
                        const nftData = await AdminGetData(`admin/nft/${id}`);
                        const user = await AdminGetData("admin/user");

                        //See if this isn't a trial minted NFT
                        if (user.trialMintId === id && !user.trialMintPaid && !user.trialMintClaimed) {
                            alert("You need to claim the NFT before you can update the description");
                            setLoading(false);
                            return;
                        }

                        const wallet = await AdminGetData(`admin/wallet/${nftData.walletId}`);
                        if (wallet.walletAddress !== account) {
                            alert("Selected wallet cannot update this artwork because it is owned by different account, please select different address");
                            setLoading(false);
                            return;
                        }
                        const response = await AdminPutData(`nft/update/nft/${id}/artwork/${artworkId}`, { name: newName, metadata: newDescription });

                        const wsProvider = new WsProvider("wss://kusama-asset-hub-rpc.polkadot.io");
                        const api = await ApiPromise.create({ provider: wsProvider });
                        const callData = response.callData;
                  
                        let call = api.tx(callData);
                        await call.signAndSend(accountAddr, { signer: injector.signer }, async ({ status, txHash, dispatchError }) => {
                          if (status.isFinalized) {
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
                              // Update database to reflect ownership change
                              let resp = await AdminPutData("nft/amend/nft/" + id, { name: newName, metadata: newDescription });
                              if (resp.status === "Success") {
                                    alert("The description has been updated successfully");

                                  setLoading(false);
                                  //Sleep for 2 seconds 
                                  await new Promise(r => setTimeout(r, 2000));
                                }
                                else {
                                  alert("Description update failed");
                                }
                              }
                              // Refresh page to load new description
                              window.location.reload();
                            }
                          });}
                          catch (error) {
                            alert(`An error occurred while updating the NFT because ${error}.`);
                            setLoading(false);
                        }
                    }}
                >
                    {loading ? (
                        <>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Changing description...
                        </>
                    ) : (
                        "Submit"
                    )}
                </button>
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Popover id="submit-info">
                            <Popover.Header as="h3">Submit Information</Popover.Header>
                            <Popover.Body>
                                By clicking submit, you will get prompted with a call that, when signed, will proceed to update the NFT on chain.
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <Button variant="outline-secondary" size="sm" className="ms-2">
                        <span>ⓘ</span>
                    </Button>
                </OverlayTrigger>
                </form>
            </div>
            </AdminDetail.Row>
        </div>
    );
};

export default NftEdit;
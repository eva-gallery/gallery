'use client';
import React from 'react';
import { OverlayTrigger, Popover, Button } from "react-bootstrap";
import AdminDetail from '../../components/detail';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit, faRadiation, faRecycle, faRemove, faTrash, faTrashAlt, faTrashArrowUp } from '@fortawesome/free-solid-svg-icons';
import { AdminGetData, AdminPutData } from '../../functions/get.data';
import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';
import { ApiPromise, WsProvider } from "@polkadot/api";

const NftRemove: React.FC<{ description: string; name: string; id: string, artworkId: string }> = ({ description, name, id, artworkId }) => {
    const [newName, setNewName] = React.useState(name);
    const [newDescription, setNewDescription] = React.useState(description);
    const [loading, setLoading] = React.useState(false);
    return (
        <div>
            <hr className='my-5' />
            <AdminDetail.Row icon="paper" name="Burn NFT">
            <div className="d-flex align-items-center">
                <Button 
                    className="btn btn-danger" 
                    onClick={() => {
                        const form = document.getElementById('remove-form');
                        if (form) {
                            form.style.display = form.style.display === 'none' ? 'block' : 'none';
                        }
                    }}
                >
                    Burn NFT
                    <FontAwesomeIcon icon={faTrash} className="ms-2" />
                </Button>
                <OverlayTrigger
                    placement="right"
                    overlay={
                        <Popover id="take-ownership-guide">
                            <Popover.Header as="h3">Removing your artwork</Popover.Header>
                            <Popover.Body>
                                Following button burns your NFT. This action is irreversible and cannot be undone thus, please be careful when signing this transaction. You can always mint new NFT from your artwork to bring this NFT back. But minting involves addition cost.
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
            </div>
            <div id="remove-form" style={{ display: 'none', marginTop: '20px' }}>
                <form>
                    <div className="form-check mb-3 d-flex align-items-center">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="acknowledge" 
                            required 
                        />
                        <label className="form-check-label ms-2" htmlFor="acknowledge">
                            I acknowledge that my artwork will be permanently deleted.
                        </label>
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-danger"
                        onClick={async (e) => {
                            e.preventDefault();
                            try{
                            setLoading(true);

                            const checkbox = document.getElementById('acknowledge') as HTMLInputElement;
                            if (!checkbox?.checked) {
                                alert("You must acknowledge that your artwork will be permanently deleted.");
                                setLoading(false);
                                return;
                            }
                            const account = localStorage.getItem('account');
                            const accountAddr = localStorage.getItem('accountAddr');

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
                            //check if account is not found
                            if (!account || !injector) {
                                alert("Account not found or wallet not properly connected");
                                setLoading(false);
                                return;
                            }

                            //Check if account is owner of the artwork
                            const nftData = await AdminGetData(`admin/nft/${id}`);
                            const user = await AdminGetData("admin/user");

                            //See if this isn't a trial minted NFT
                            if (user.trialMintId === id && !user.trialMintPaid && !user.trialMintClaimed) {
                                alert("You need to claim the NFT before you can delete it");
                                setLoading(false);
                                return;
                            }

                            const wallet = await AdminGetData(`admin/wallet/${nftData.walletId}`);
                            if (wallet.walletAddress !== account) {
                                alert("Selected wallet cannot update this artwork because it is owned by different account, please select different address");
                                setLoading(false);
                                return;
                            }

                            const response = await AdminPutData(`nft/remove/nft/${id}`);

                            const wsProvider = new WsProvider("wss://kusama-asset-hub-rpc.polkadot.io");
                            const api = await ApiPromise.create({ provider: wsProvider });
                            const callData = response.callData;
                      
                            // Add your remove NFT logic here
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
                                let resp = await AdminPutData("nft/remove/db/nft/" + id);
                                if (resp.status === "Success") {
                                        alert("The NFT has been successfuly removed from the blockchain");

                                    setLoading(false);
                                    //Sleep for 2 seconds 
                                    await new Promise(r => setTimeout(r, 2000));
                                    }
                                    else {
                                    alert("NFT removal failed, try again");
                                    }
                                }
                                // Refresh page to load new description
                                window.location.href = '/admin/nft';
                                }
                            });}
                            catch (error) {
                                alert('Error removing NFT: ' + error);
                                setLoading(false);
                            }
                        }}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="ms-2">Removing NFT...</span>
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>
                    <OverlayTrigger
                    placement="right"
                    overlay={
                        <Popover id="take-ownership-guide">
                            <Popover.Header as="h3">Removing your artwork</Popover.Header>
                            <Popover.Body>
                                Clicking this button will prompt you to sign transaction, that will remove your artwork NFT from the blockchain and from our database. The artwork that NFT is associated to will remain untouched. This action is irreversible and cannot be undone thus, please be careful when signing this transaction. You can always mint new NFT from your artwork to bring this NFT back. But minting involves addition cost.
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
                </form>
            </div>
            </AdminDetail.Row>
        </div>
    );
};

export default NftRemove;
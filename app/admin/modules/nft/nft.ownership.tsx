'use client';

import { faHand } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, OverlayTrigger, Popover } from 'react-bootstrap';
import { AdminGetData, AdminPutData } from '../../functions/get.data';
import { ApiPromise, WsProvider } from "@polkadot/api";
import { web3Enable, web3FromAddress } from '@polkadot/extension-dapp';

// Dudo - tu daj komponent na ownership trial minted

export const Ownership: React.FC = () => {

  const [loading, setLoading] = useState(false);

  const handleTakeOwnership = async () => {
    const account = localStorage.getItem('account');
    const accountAddr = localStorage.getItem('accountAddr');
    setLoading(true);
    try {
      // Get user
      let user = await AdminGetData("admin/user");
      // Check if user hasn't already claimed the NFT
      if (user['trialMintClaimed'] || user['trialMintPaid']) {
        alert("You have already claimed the NFT");
        setLoading(false);
        return;
      }

      //Also see if wallet is connected
      if (!accountAddr) {
        alert("Please connect your wallet first");
        setLoading(false);
        return;
      }
      await web3Enable('Eva gallery');
      //Find account that is same as accountAddr
      const injector = await web3FromAddress(accountAddr)

      //check if account is not found
      if (!account) {
        alert("Account not found");
        setLoading(false);
        return;
      }

      let walData = await AdminGetData("nft/wallet/eva");
      const response = await AdminGetData('ownership/payment/ownership/' + walData.walletAddress);

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
            console.log(txHash);
            // Update database to reflect ownership change
            let resp = await AdminPutData("ownership/updateDB/account/" + account);
            console.log(resp.status);
            if (resp.status === "Success") {
              let swap = await AdminPutData(`ownership/transfer/asset/${user['trialMintId']}/account/${account}`); 
              if (swap.status === "Success") {
                alert("Ownership claimed successfully");
                setLoading(false);
                //Sleep for 2 seconds 
                await new Promise(r => setTimeout(r, 2000));
              }
              else {
                alert("Ownership claim failed");
              }
            }
            // Refresh page to load new NFT
            window.location.reload();
          }
        }
      });

    } catch (error) {
      console.error('Error taking ownership:', error);
      setLoading(false);
    }
  };
  return (
  <div>
    <Button variant="danger" className='me-2' onClick={handleTakeOwnership} disabled={loading}>
    {loading ? (
      <>
      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
      Claiming...
      </>
    ) : (
      <>
      <FontAwesomeIcon icon={faHand} className='me-2' />
      Take Ownership
      </>
    )}
    </Button>
    <OverlayTrigger
            placement="right"
            overlay={
            <Popover id="take-ownership-guide">
               <Popover.Header>Claiming your artwork&apos;s NFT token</Popover.Header>
               <Popover.Body>
               You can claim your artwork&apos;s NFT token that was trial minted by clicking &quot;Claim ownership&quot; button. This claim issues a small fee from your account to Eva Gallery account in order to cover transfer fees. Once done, you will be able to see your artwork&apos;s NFT token in your wallet.
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
    </div>
  );
};

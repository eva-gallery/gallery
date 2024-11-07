import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

// Dudo - tu daj komponent na pripojenie wallet

export const Connect: React.FC = () => {
   return (
      <>
         <Button variant="dark" className='me-2'>
            <FontAwesomeIcon icon={faWallet} className='me-2' />
            Connect to / Refresh NFT Wallet
         </Button >
      </>
   );
};

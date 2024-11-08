import { faHand, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

// Dudo - tu daj komponent na ownership trial minted

export const Ownership: React.FC = () => {
   return (
      <>
         <Button variant="danger" className='me-2'>
            <FontAwesomeIcon icon={faHand} className='me-2' />
            Take Ownership
         </Button>
      </>
   );
};

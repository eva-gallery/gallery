import { faHand, faLink, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

// Dudo - tu daj komponent na mint trial minted

interface MintProps {
   id: string;
}

export const Mint: React.FC<MintProps> = ({ id }) => {
   return (
      <>
         <Button variant="secondary" className='mt-2'>
            <FontAwesomeIcon icon={faLink} className="me-2" />
            Mint NFT

         </Button>
      </>
   );
};

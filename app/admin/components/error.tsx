import { faTriangleCircleSquare, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Modal } from "react-bootstrap";

type Props = {
  error: string;
};

const AdminError: React.FC<Props> = ({ error }) => {

  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} size='sm' centered >
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faTriangleExclamation} className="text-danger me-2" />
            Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error}
        </Modal.Body>
      </Modal>
    </>
  );
};


export default AdminError;

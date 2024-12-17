import React from 'react';
import { Spinner } from "react-bootstrap";


const AdminLoading: React.FC = () => {

  return (
    <>
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </main>
    </>
  );
}

export default AdminLoading;

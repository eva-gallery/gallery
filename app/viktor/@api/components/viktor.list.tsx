import React from 'react';
import { Table } from 'react-bootstrap';

import { V } from '@/app/viktor';
import { M } from '@/app/viktor/modules';
import { ViktorType } from '@/app/viktor/@api/types';

type Props = {
  viktor: ViktorType;
  children: React.ReactNode;
};

const ViktorList: React.FC<Props> = ({ viktor, children }) => {



  return (
    <>
      <h1 className='text-center text-uppercase mb-5'>
        <V.Icon name={viktor.module} size={48} className='me-3' />
        {viktor.module}
      </h1>

      {children}

      <V.Insert viktor={viktor}>
        insert
      </V.Insert>
    </>
  );
};


export default ViktorList;

import React, { ReactNode } from 'react';

type Props = {
  code: string;
};

const ViktorFlag: React.FC<Props> = ({ code }) => {

  return (
    <img src={`https://flagcdn.com/${code.toLowerCase()}.svg`} width={24} height={16} alt="flag" className='me-2 border' />
  );
};




export default ViktorFlag;

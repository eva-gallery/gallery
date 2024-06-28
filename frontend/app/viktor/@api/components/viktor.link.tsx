import React from 'react';
import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';

type PropsDetail = {
  viktor: ViktorType;
  children: React.ReactNode;
};

interface ViktorLinkType extends React.FC<PropsDetail> {
  Icon: React.FC<PropsDetail>;
};

const ViktorLinkIcon: React.FC<PropsDetail> = ({ viktor, children }) => {
  return (
    <a href={`/viktor/${viktor.module}/detail/${viktor.unique}`}>
      <V.Icon name={viktor.module} size={24} className='me-2' />
      {children}
    </a>
  );
};

const ViktorLink: ViktorLinkType = ({ viktor, children }) => {
  return (
    <a href={`/viktor/${viktor.module}/detail/${viktor.unique}`}>
      {children}
    </a>
  );
};

ViktorLink.Icon = ViktorLinkIcon;

export default ViktorLink;

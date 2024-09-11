import React from 'react';

import { format } from 'date-fns';

import { AdminType } from '@/app/admin/types';


export const AdminBoolean: React.FC<{ value: boolean }> = ({ value }) => {
  const renderIcon = () => {
    switch (value) {
      case true:
        return <AdminIcon name="yes" size={24} />;
      case false:
        return <AdminIcon name="no" size={24} />;
    }
  };
  return (
    <>
      {renderIcon()}
    </>
  );
};

export const AdminDate: React.FC<{ date: string }> = ({ date }) => {
  const datestring = new Date(date);
  const formattedDate = format(datestring, "d. MMMM yyyy");
  return (
    <>
      {formattedDate}
    </>
  );
};


export const AdminEmail: React.FC<{ email: string }> = ({ email }) => {
  return (
    <a href={`mailto:${email}`}>{email}</a>
  );
};

export const AdminFlag: React.FC<{ code: string }> = ({ code }) => {
  return (
    <img src={`https://flagcdn.com/${code.toLowerCase()}.svg`} width={24} height={16} alt="flag" className='me-2 border' />
  );
};


export const AdminHtml: React.FC<{ html: string; className?: string; }> = ({ html, className }) => {
  return (
    <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};



export const AdminIcon: React.FC<{ name: string; size: number; className?: string; }> = ({ name, size, className }) => {

  return (
    <img src={`/images/icons/${name}.png`} width={size} height={size} alt={name} className={className} />
  );
};


export const AdminLinkIcon: React.FC<{ admin: AdminType; children: React.ReactNode; }> = ({ admin, children }) => {
  return (
    <a href={`/admin/${admin.module}/detail/${admin.unique}`}>
      <AdminIcon name={admin.module} size={24} className='me-2' />
      {children}
    </a>
  );
};


export const AdminLink: React.FC<{ admin: AdminType; children: React.ReactNode; }> = ({ admin, children }) => {
  return (
    <a href={`/admin/${admin.module}/detail/${admin.unique}`}>
      {children}
    </a>
  );
};


import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    email: string; 
};

const ViktorEmail: React.FC<Props> = ({ email }) => {

    return (
      <a href={`mailto:${email}`}>{email}</a>
    );
};




export default ViktorEmail;

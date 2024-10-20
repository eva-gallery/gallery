import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
    name: string;
    size: number;
    className?: string;    
};

const ViktorIcon: React.FC<Props> = ({ name, size, className }) => {

    return (
      <Image src={`/images/icons/${name}.png`} width={size} height={size} alt={name} className={className} />
    );
};




export default ViktorIcon;

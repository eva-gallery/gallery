'use client'

import React, { useEffect } from 'react';
import { useViktor } from '@/app/viktor/@api/viktor.context';
import { ViktorType } from '@/app/viktor/@api/types';

type PropsDetail = {
  params: ViktorType;
  children: React.ReactNode;
};

const ViktorProvider: React.FC<PropsDetail> = ({ params, children }) => {
  const { viktor, setViktor } = useViktor();

  useEffect(() => {
    setViktor({
      ...viktor,
      ...params
    });
  }, [params, setViktor, viktor]);

  return <>{children}</>;
};

export default ViktorProvider;

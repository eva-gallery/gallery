import React, { ReactNode } from 'react';

import { V } from '@/app/viktor';

type Props = {
    value: string;     
};

const ViktorBoolean: React.FC<Props> = ({ value }) => {

  const renderIcon = () => {
    switch (value) {
      case "true":
        return <V.Icon name="no" size={24} />;
      case "false":
        return <V.Icon name="yes" size={24} />;     
    }
  };

    return (
      <>
        {renderIcon()}
      </>
    );
};

export default ViktorBoolean;

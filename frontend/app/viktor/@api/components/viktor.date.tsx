import React, { ReactNode } from 'react';
import { format } from 'date-fns';

type Props = {
  date: string;      
};

const ViktorDate: React.FC<Props> = ({ date }) => {

    const datestring = new Date(date);
    const formattedDate = format(datestring, "d. MMMM yyyy");

    return (
      <>
        {formattedDate}
      </>

    );
};

export default ViktorDate;

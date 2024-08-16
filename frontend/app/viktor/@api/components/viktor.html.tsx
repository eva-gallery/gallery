import React from 'react';


type Props = {
    html: string;    
    className: string;
};

const ViktorHtml: React.FC<Props> = ({ html, className }) => {

    return (
      <span className={className} dangerouslySetInnerHTML={{ __html: html }}/>
    );
};

export default ViktorHtml;

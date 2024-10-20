import React from 'react';

import { V } from '@/app/viktor';

import { ViktorType } from '@/app/viktor/@api/types';
import { D } from '@/app/datadmin';

import { F } from '@/app/framework';

import { M } from '@/app/viktor/modules';
import objectX from '@/app/framework/objectx';

type Props = {
    viktor: ViktorType;
    object: objectX;
};

const Form: React.FC<Props> = ({ viktor, object }) => {


    return (
        <>
            <D.Input.Tinytext name="name" value={object.data["name"]} />
        </>
    );
}

export default Form;


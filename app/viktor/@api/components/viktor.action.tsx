import React from 'react';

import { V } from '@/app/viktor';
import { ViktorType } from '@/app/viktor/@api/types';

import { F } from '@/app/framework';
import { M } from '@/app/viktor/modules';

type Props = {
   viktor: ViktorType;
   actions: string[];
};

const ViktorActions: React.FC<Props> = ({ viktor, actions }) => {

   if (viktor.action == undefined) { viktor.action = actions[0]; }

   const ViktorComponent = (viktor: ViktorType) => {

      if (actions.includes(viktor.action)) {

         const module = F.capitalize(viktor.module);
         const action = F.capitalize(viktor.action);

         const component = M[module][action];
         return component(viktor);
      } else {
         return <div>Unknown action</div>;
      }
   };

   return (
      <>
         {ViktorComponent(viktor)}
      </>
   );
};

export default ViktorActions;

import React from 'react';

import { A } from '@/app/admin';
import { AdminType } from '@/app/admin/types';

import { M } from '@/app/admin/modules';

type Props = {
   admin: AdminType;
   actions: string[];
};

const AdminActions: React.FC<Props> = ({ admin, actions }) => {

   if (admin.action == undefined) { admin.action = actions[0]; }

   const AdminComponent = (admin: AdminType) => {

      if (admin.action && actions.includes(admin.action)) {

         const module = A.capitalize(admin.module);
         const action = A.capitalize(admin.action);

         const component = M[module][action];
         return component(admin);
      } else {
         return <div>Unknown action</div>;
      }
   };

   return (
      <>
         {AdminComponent(admin)}
      </>
   );
};

export default AdminActions;

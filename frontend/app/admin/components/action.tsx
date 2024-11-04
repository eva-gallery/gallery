import React from 'react';

import { AdminType } from '@/app/admin/types';

import { M } from '@/app/admin/modules';
import { capitalize } from '../functions/tools';
import { ModuleType } from '@/app/admin/modules/index'; // Adjust the import path as necessary

type Props = {
   admin: AdminType;
   actions: string[];
};

const AdminActions: React.FC<Props> = ({ admin, actions }) => {

   if (admin.action == undefined) { admin.action = actions[0]; }

   const AdminComponent = (admin: AdminType) => {

      if (admin.action && actions.includes(admin.action)) {

         const modul = capitalize(admin.modul) as keyof ModuleType;
         const action = capitalize(admin.action);

         const component = M[modul][action];
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

'use server'

import { redirect } from 'next/navigation';
import { AdminType } from '../../types';

export async function Transform(formData: FormData) {
   const json: Record<string, any> = {};

   formData.forEach((value, key) => {
      switch (key) {
         case 'public':
            json[key] = value === 'on' ? "true" : "false";
            break;
         // case 'born':
         //    json[key] = new Date(value).toISOString();
         //    break;
         default:
            json[key] = value;
            break;
      }
   });

   if (!json.hasOwnProperty('public')) {
      json['public'] = "false";
   }

   console.log("**** Transform ****", json);

   return json;
}


export async function Redirect(admin: AdminType, data: any) {

   console.log("**** Redirect ****", data);

   switch (admin.action) {
      case "list":
      case "detail":
         redirect("/admin/" + admin.modul + "/detail/" + data.id);
         break;
      case "delete":
         redirect("/admin/" + admin.modul);
         break;
   }

}

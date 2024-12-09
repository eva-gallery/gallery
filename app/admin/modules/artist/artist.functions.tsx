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
         default:
            json[key] = value;
            break;
      }
   });

   if (!json.hasOwnProperty('public')) {
      json['public'] = "false";
   }


   return json;
}


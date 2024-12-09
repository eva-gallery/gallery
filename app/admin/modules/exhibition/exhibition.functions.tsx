'use server'

import { redirect } from 'next/navigation';
import { AdminType } from '../../types';
import { stringify } from 'querystring';

export async function Transform(formData: FormData) {
   const json: Record<string, any> = {};


   let artworks: any[] = [];

   formData.forEach((value, key) => {
      switch (key) {
         case 'public':
            json[key] = value === 'on' ? "true" : "false";
            break;

         case 'artworks[]':
            artworks.push(value);
            break;
         default:
            json[key] = value;
            break;
      }
   });


   json['artworks'] = artworks;


   if (!json.hasOwnProperty('public') && !json.hasOwnProperty('artworks')) {
      json['public'] = "false";
   }



   return json;
}

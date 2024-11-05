'use server'


export async function Transform(formData: FormData) {
   const json: Record<string, any> = {};

   formData.forEach((value, key) => {
      switch (key) {
         case 'public':
            json[key] = value === 'on' ? "true" : "false";
            break;

         case 'image':
            if (value instanceof File && value.size > 0) {
               json[key] = value;
            }
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


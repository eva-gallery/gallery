'use server'


export async function Transform(formData: FormData) {
   const json: Record<string, any> = {};

   formData.forEach((value, key) => {
      switch (key) {

         case 'data':
            if (value instanceof File && value.size > 0) {
               json[key] = value;
            }
            break;

         default:
            json[key] = value;
            break;
      }
   });



   return json;
}


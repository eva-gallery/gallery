'use server'


export async function Transform(formData: FormData) {
   const json: Record<string, any> = {};
   const newFormData = new FormData();

   formData.forEach((value, key) => {
      switch (key) {

         case 'avatar':
            if (value instanceof File && value.size > 0) {
               newFormData.append(key, value);
            }
            break;

         default:
            json[key] = value;
            newFormData.append(key, value);
            break;
      }
   });

   if (formData.has('avatar')) {
      return newFormData;
   } else {
      return json;
   }
}


'use server'


export async function Transform(formData: FormData) {
   const newFormData = new FormData();

   formData.forEach((value, key) => {
      switch (key) {
         case 'public':
            newFormData.append(key, value === 'on' ? 'true' : 'false');
            break;

         case 'image':
            if (value instanceof File && value.size > 0) {
               newFormData.append(key, value);
            }
            break;


         default:
            newFormData.append(key, value);
            break;
      }
   });

   if (!newFormData.has('public')) {
      newFormData.append('public', 'false');
   }



   return newFormData;
}


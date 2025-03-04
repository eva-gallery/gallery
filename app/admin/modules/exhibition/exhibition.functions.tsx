'use server'

export async function Transform(formData: FormData) {


   const newFormData = new FormData();

   formData.forEach((value, key) => {
      switch (key) {
         case 'artworks':
            newFormData.append('artworks[]', value === 'on' ? 'true' : 'false');
            break;

         case 'public':
            newFormData.append(key, value === 'on' ? 'true' : 'false');
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
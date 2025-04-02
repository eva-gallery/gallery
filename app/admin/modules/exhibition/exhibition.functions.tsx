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

         case 'activeRoomId':
            // For activeRoomId, if it's empty, send a special "null" value 
            // that the backend can interpret as NULL rather than an empty string
            if (value && value !== '' && value !== 'null') {
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

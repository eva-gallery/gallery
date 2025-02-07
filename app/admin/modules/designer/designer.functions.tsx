'use server'


export async function Transform(formData: FormData) {
   const json: Record<string, any> = {};
   const newFormData = new FormData();


   formData.forEach((value, key) => {
      switch (key) {

         case 'x':
         case 'y':
         case 'width':
         case 'height':
         case 'length':
            json[key] = Number(value);
            break;
         case 'backgroundMusicId':
         case 'environmentImageId':
            if (value == '') {
               json[key] = null;
            } else {
               json[key] = value;
            }
            break;

         case 'data':
            if (value instanceof File && value.size > 0) {
               newFormData.append(key, value);
            }
            break;
         case 'items':
         case 'lamps':
         case 'walls':
            if (value !== '') { json[key] = JSON.parse(value as string); }
            else { json[key] = []; }
            break;

         default:
            json[key] = value;
            newFormData.append(key, value);
            break;
      }
   });

   if (formData.has('data')) {
      return newFormData;
   } else {
      return json;
   }


}


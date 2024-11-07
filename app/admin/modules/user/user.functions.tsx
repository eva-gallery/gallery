'use server'


export async function Transform(formData: FormData) {
   const json: Record<string, any> = {};

   formData.forEach((value, key) => {
      switch (key) {
         default:
            json[key] = value;
            break;
      }
   });

   return json;
}


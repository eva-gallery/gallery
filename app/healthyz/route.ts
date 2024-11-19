import { NextResponse } from 'next/server';

export async function GET() {
   try {
      const checkBackend = async () => {
         const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

         if (!backendUrl) {
            console.error("Backend URL nie je nastavený v environmentálnych premenných!");
            return { status: 'ERROR', message: 'Backend NEXT_PUBLIC_BACKEND_URL is missing' };
         }

         try {
            const response = await fetch(`${backendUrl}/healthyz`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
               },
            });

            if (!response.ok) {
               const errorData = await response.json();
               console.error(`Backend vrátil chybu: ${response.status} ${response.statusText}`, errorData);
               return { status: 'ERROR', message: 'Backend health check failed', details: errorData };
            }

            const data = await response.json();
            console.log("Backend je zdravý:", data);
            return { status: 'OK', message: 'Backend is healthy', data };

         } catch (error) {
            console.error("Chyba pri komunikácii s backendom:", error);
            return { status: 'ERROR', message: 'Error connecting to backend', details: error };
         }
      };

      // Volanie funkcie na kontrolu backendu
      const backendStatus = await checkBackend();

      if (backendStatus.status === 'OK') {
         return NextResponse.json(
            { status: 'OK', message: 'Service is healthy', backend: backendStatus },
            { status: 200 }
         );
      } else {
         return NextResponse.json(
            { status: 'ERROR', message: 'Service is not healthy', backend: backendStatus },
            { status: 503 }
         );
      }
   } catch (error) {
      console.error("Chyba pri kontrole služby:", error);
      const errorMessage = (error as Error).message;
      return NextResponse.json(
         { status: 'ERROR', message: 'Service is not healthy', error: errorMessage },
         { status: 503 }
      );
   }
}

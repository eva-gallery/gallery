import { NextResponse } from 'next/server';

export async function GET() {
   try {
      // Overenie pripravenosti
      const isReady = true; // Nahraď reálnou logikou

      if (isReady) {
         return NextResponse.json({ status: 'OK', message: 'Service is ready' }, { status: 200 });
      } else {
         return NextResponse.json({ status: 'ERROR', message: 'Service is not ready' }, { status: 503 });
      }
   } catch (error) {
      const errorMessage = (error as Error).message;
      return NextResponse.json({ status: 'ERROR', message: 'Service is not ready', error: errorMessage }, { status: 503 });
   }
}

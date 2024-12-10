// app/artworks/[...slug]/error.tsx
'use client'
 
import { useEffect } from 'react'
import NavbarComponent from '@/app/web/components/NavbarComponent'
import Footer from '@/app/web/components/Footer'
import { Container } from 'react-bootstrap'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <>
      <NavbarComponent />
      <Container className="py-5 text-center">
        <h2>Something went wrong!</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => reset()}
        >
          Try again
        </button>
      </Container>
      <Footer />
    </>
  )
}
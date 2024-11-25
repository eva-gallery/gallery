// app/artists/[...slug]/error.tsx
'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container py-5 text-center">
      <h2>Something went wrong!</h2>
      <button
        className="btn btn-primary mt-3"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
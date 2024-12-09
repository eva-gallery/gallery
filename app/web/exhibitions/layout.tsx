// app/artists/layout.tsx
export default function ExhibitionsLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div>
        {/* Add any artists-specific layout elements here */}
        {children}
      </div>
    )
  }
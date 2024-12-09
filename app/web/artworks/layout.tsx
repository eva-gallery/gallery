// app/artists/layout.tsx
export default function ArtistsLayout({
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
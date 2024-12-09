// app/artists/layout.tsx
export default function GalleriesLayout({
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
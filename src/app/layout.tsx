import './globals.css'

export const metadata = {
  title: 'Upload to S3',
  description: 'Client to upload images to S3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

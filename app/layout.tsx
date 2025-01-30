export const metadata = {
  title: 'Bestcat',
  description: 'Finding the best cat.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
	  <head>
	  		<link rel="icon" href="favicon.ico" type="image/x-icon" />
	  </head>
      <body>{children}</body>
    </html>
  )
}

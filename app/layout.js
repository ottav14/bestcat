import './globals.css';
import NavBar from '../components/NavBar/NavBar.jsx';
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
	title: 'Bestcat',
	description: 'Finding the best cat.',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="favicon.ico" type="image/x-icon" />
			</head>
			<body>
				<NavBar />
				{children}
				<Analytics />
			</body>
		</html>
	)
}

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
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
				<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
			</head>
			<body>
				<NavBar />
				{children}
				<Analytics />
			</body>
		</html>
	)
}

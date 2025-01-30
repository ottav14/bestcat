"use client"

import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Button from "../components/Button/Button.tsx";
import DynamicImage from "../components/DynamicImage/DynamicImage.tsx";

export default function Home() {

	const [imageUrl, setImageUrl] = useState('/api/image/Bombay_79.jpg');

	useEffect(() => {
		const fetchImage = async () => {
			const filename = "Bombay_79.jpg"; 
			const url = `/api/image/${filename}`;
			setImageUrl(url);
		};

		fetchImage();
	}, []);

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.interfaceContainer}>
					<DynamicImage />
					<div className={styles.buttonContainer}>
						<Button 
							backgroundImage='/thumbs-up.svg' 
							backgroundColor='#0f0'
						/>
						<Button 
							backgroundImage='/thumbs-down.svg' 
							backgroundColor='#f00'
						/>
					</div>
				</div>
			</main>
			<footer className={styles.footer}>
				test
			</footer>
		</div>
	);
}

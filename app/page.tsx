"use client"

import { useState, useEffect } from 'react';
import Image from "next/image";
import styles from "./page.module.css";
import Button from "../components/Button/Button.tsx";
import DynamicImage from "../components/DynamicImage/DynamicImage.tsx";

export default function Home() {

	const [imageUrl, setImageUrl] = useState('');

	const fetchImage = async () => {
		const response = await fetch("/api/id"); 
		const data = await response.json();
		const url = `/api/image/${data.imageId}`;
		setImageUrl(url);
		console.log(data.imageId);
	};

	useEffect(() => {

		fetchImage();

	}, []);

	const action = () => {
		fetchImage();
	}

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.interfaceContainer}>
					<DynamicImage imageUrl={imageUrl} />
					<div className={styles.buttonContainer}>
						<Button 
							backgroundImage='/thumbs-up.svg' 
							backgroundColor='#0f0'
							action={action}
						/>
						<Button 
							backgroundImage='/thumbs-down.svg' 
							backgroundColor='#f00'
							action={action}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}

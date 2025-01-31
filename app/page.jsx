"use client"

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Button from '../components/Button/Button.jsx';
import DynamicImage from '../components/DynamicImage/DynamicImage.jsx';

const Home = () => {

	const [base64, setBase64] = useState('');
	const [fetched, setFetched] = useState(false);
	const [count, setCount] = useState(0);

	const fetchImage = async () => {
		if(!fetched) {
			const response = await fetch('/api/doc');
			const data = await response.json();
			setBase64(data.imageBase64);
			setFetched(true);
			setCount(data.count);
			console.log(data.count);
		}
	}

	useEffect(() => {
		fetchImage();
	});

	const action = () => {
		setFetched(false);
	}


	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.sidebar}>
					<a href="/leaderboard">Leaderboard</a>
				</div>
				<div className={styles.interfaceContainer}>
					<div className={styles.count}>
						{count}
					</div>
					{base64 ? <DynamicImage img={base64} /> : <div className={styles.placeHolder} />}
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
export default Home;

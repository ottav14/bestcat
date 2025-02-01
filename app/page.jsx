"use client"

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Button from '../components/Button/Button.jsx';
import NavButton from '../components/NavButton/NavButton.jsx';
import DynamicImage from '../components/DynamicImage/DynamicImage.jsx';

const Home = () => {

	const [base64, setBase64] = useState('');
	const [fetched, setFetched] = useState(false);
	const [id, setId] = useState('');
	const [count, setCount] = useState(0);

	const fetchDoc = async () => {
		if(!fetched) {
			const response = await fetch('/api/doc');
			const data = await response.json();
			setBase64(data.imageBase64);
			setFetched(true);
			setCount(data.count);
			setId(data.id);
		}
	}

	const updateCount = async (_id, _parity) => {

		const response = await fetch('/api/update', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: _id, parity: _parity })
		});
		const responseJSON = await response.json();
		console.log(responseJSON);

	}

	useEffect(() => {
		fetchDoc();
	});

	const upVote = () => {
		setFetched(false);
		if(id)
			updateCount(id, '1');
	}

	const downVote = () => {
		setFetched(false);
		if(id)
			updateCount(id, '-1');
	}


	return (
		<main className={styles.main}>
			<NavButton text='Leaderboard' link='/leaderboard' />
			<div className={styles.interfaceContainer}>
				<div className={styles.title}>
					Bestcat
				</div>
				{base64 ? <DynamicImage img={base64} /> : <div className={styles.placeHolder} />}
				<div className={styles.buttonContainer}>
					<Button 
						backgroundImage='/thumbs-up.svg' 
						backgroundColor='#06d6a0'
						action={upVote}
					/>
					<Button 
						backgroundImage='/thumbs-down.svg' 
						backgroundColor='#ef476f'
						action={downVote}
					/>
				</div>
			</div>
		</main>
	);
}
export default Home;

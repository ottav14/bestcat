"use client"

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import Button from '../components/Button/Button.jsx';
import NavButton from '../components/NavButton/NavButton.jsx';
import DynamicImage from '../components/DynamicImage/DynamicImage.jsx';

const Home = () => {

	const [base64, setBase64] = useState('');
	const [apiResponse, setApiResponse] = useState({});
	const [loading, setLoading] = useState(false);
	const [rerender, setRerender] = useState(false);
	const [error, setError] = useState(false);
	const [id, setId] = useState('');
	const [count, setCount] = useState(0);


	const updateCount = async (_id, _parity) => {
		try {
			const response = await fetch('/api/update', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: _id, parity: _parity })
			});
			const responseJSON = await response.json();
			console.log(responseJSON);
		} catch(error) {
			console.error(error);
		}
	}

	useEffect(() => {
		const fetchDoc = async () => {
			try {
				const response = await fetch('/api/doc');
				const data = await response.json();
				setLoading(false);
				setBase64(data.imageBase64);
				setCount(data.count);
				setId(data.id);
			} catch(error) {
				setError(error.message);
			}
		}
		fetchDoc();
	}, [rerender]);

	const upVote = () => {
		setRerender(!rerender);
		console.log(id);
		if(id)
			updateCount(id, '1');

	}

	const downVote = () => {
		setRerender(!rerender);
		if(id)
			updateCount(id, '-1');
	}

	const unsure = () => {
		setRerender(!rerender);
	}

	return (
		<main className={styles.main}>
			<NavButton text='Leaderboard' link='/leaderboard' />
			<div className={styles.interfaceContainer}>
				<div className={styles.title}>
					Bestcat
				</div>
				{!loading ? <DynamicImage img={base64} /> : <div className={styles.placeHolder} />}
				<div className={styles.buttonContainer}>
					<Button 
						backgroundImage='/thumbs-up.svg' 
						backgroundColor='#06d6a0'
						action={upVote}
					/>
					<Button 
						backgroundImage='/question-mark.svg' 
						backgroundColor='#959595'
						action={unsure}
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

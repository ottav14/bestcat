'use client'

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import LeaderboardEntry from '../../components/LeaderboardEntry/LeaderboardEntry.jsx';
import NavButton from '../../components/NavButton/NavButton.jsx';
import PageButton from '../../components/PageButton/PageButton.jsx';

const uri = process.env.MONGODB_URI;

const incrementPage = () => {
	return;
}

const Leaderboard = () => {

	const [entries, setEntries] = useState('');	
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const getLeaderboard = async () => {
			try {
				const response = await fetch('/api/leaderboard/1');
				const data = await response.json();
				setEntries(data);
			} catch(error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		getLeaderboard();
	}, []);


	if(loading) return <div>loading...</div>;
	if(error) return <div>{error.message}</div>
	
	return (
		<main className={styles.main}>
			<NavButton text='Bestcat' link='/' />
			<div className={styles.leaderboard}>
				<p className={styles.title}>Leaderboard</p> 
				{entries.map((entry) => (
					<LeaderboardEntry img={entry.base64} count={entry.count} key={entry.id} />
				))}
			</div>
		</main>
	);


}
export default Leaderboard;

'use client'

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import LeaderboardEntry from '../../../components/LeaderboardEntry/LeaderboardEntry.jsx';
import LoadingImage from '../../../components/LoadingImage/LoadingImage.jsx';
import LeaderboardNav from '../../../components/LeaderboardNav/LeaderboardNav.jsx';

const uri = process.env.MONGODB_URI;

const Leaderboard = () => {

	const [entries, setEntries] = useState('');	
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [primaryColor, setPrimaryColor] = useState('');
	const [secondayColor, setSecondaryColor] = useState('');

	const params = useParams();
	const { pageNumber } = params;

	useEffect(() => {

		const rootStyles = getComputedStyle(document.documentElement);
		setPrimaryColor(rootStyles.getPropertyValue('--accent-1').trim());
		setSecondaryColor(rootStyles.getPropertyValue('--background-color').trim());

		const getLeaderboard = async () => {
			try {
				const response = await fetch(`/api/leaderboard/${pageNumber}`);
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

	const LeaderBoardEntries = () => {
		if(loading)
			return <div className={styles.leaderboard}><LoadingImage /></div>;

		return (
			<div className={styles.leaderboard}>
				<div className={styles.labels}>
					<div className={styles.catLabel}>Cat</div>
					<div className={styles.ratingLabel}>Rating</div>
				</div>
				<div className={styles.entries}>
					{entries.map((entry, i) => {
						const backgroundColor = (i % 2 == 0) ? primaryColor : secondayColor;
						return (
							<LeaderboardEntry img={entry.base64} count={entry.count} bgColor={backgroundColor} key={entry.id} />
						);
					})}
				</div>
				<LeaderboardNav pageNumber={pageNumber} />
			</div>
		);
	}

	if(error) return <div className={styles.message}>{error.message}</div>
	if(entries.error) return <div className={styles.message}>stop {'>'}:(</div>
	
	return (
		<main className={styles.main}>
			<LeaderBoardEntries />
		</main>
	);


}
export default Leaderboard;

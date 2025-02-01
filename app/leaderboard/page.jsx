import { MongoClient } from 'mongodb';
import styles from './page.module.css';
import fetchLeaderboard from '../../scripts/fetchLeaderboard';
import LeaderboardEntry from '../../components/LeaderboardEntry/LeaderboardEntry.jsx';
import NavButton from '../../components/NavButton/NavButton.jsx';

const uri = process.env.MONGODB_URI;

const Leaderboard = async () => {

	const client = new MongoClient(uri);
	await client.connect();

	const entries = await fetchLeaderboard(client);

	return (
		<main className={styles.main}>
			<NavButton text='Bestcat' link='/' />
			<div className={styles.leaderboard}>
				<p className={styles.title}>Leaderboard</p>
				{entries.map((entry) => (
					<LeaderboardEntry img={entry.base64} count={entry.count} />
				))}
			</div>
		</main>
	);


}
export default Leaderboard;

import { MongoClient } from 'mongodb';
import styles from './page.module.css';
import fetchLeaderboard from '../../scripts/fetchLeaderboard';
import LeaderboardEntry from '../../components/LeaderboardEntry/LeaderboardEntry.jsx';

const uri = process.env.MONGODB_URI;

const Leaderboard = async () => {

	const client = new MongoClient(uri);
	await client.connect();

	const entries = await fetchLeaderboard(client);

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.sidebar}>
					<a href="/">Bestcat</a>
				</div>
				<p className={styles.title}>Leaderboard</p>
				{entries.map((entry) => (
					<LeaderboardEntry img={entry.base64} count={entry.count} />
				))}
			</main>
		</div>
	);


}
export default Leaderboard;

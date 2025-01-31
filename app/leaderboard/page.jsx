import styles from './page.module.css';

const Leaderboard = () => {

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.sidebar}>
					<a href="/">Bestcat</a>
				</div>
				<p className={styles.title}>Leaderboard</p>
			</main>
		</div>
	);


}
export default Leaderboard;

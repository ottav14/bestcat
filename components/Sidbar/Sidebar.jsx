import styles from './Sidebar.module.css';

const Sidebar = () => {

	return (
		<a href="/leaderboard" className={styles.link}>
			<button className={styles.sidebar}>
				Leaderboard
			</button>
		</a>
	);
}
export default Sidebar;

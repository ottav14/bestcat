import styles from './LeaderboardNav.module.css';

const LeaderboardNav = ({ pageNumber }) => {

	const p = parseInt(pageNumber);

	if(p >= 5) {
		return (
			<div className={styles.main}>
				<a href={'/leaderboard/'+(p-1)}>
					<button className={styles.left} />
				</a>
				<a href={'/leaderboard/0'}>
					<button className={styles.min}>{0}</button>
				</a>
				<button className={styles.dots} />
				<a href={'/leaderboard/'+(p-1)}>
					<button className={styles.number}>{p-1}</button>
				</a>
				<button className={styles.active}>{p}</button>
				<a href={'/leaderboard/'+(p+1)}>
					<button className={styles.number}>{p+1}</button>
				</a>
				<a href={'/leaderboard/'+(p+2)}>
					<button className={styles.number}>{p+2}</button>
				</a>
				<button className={styles.dots} />
				<a href={'/leaderboard/150'}>
					<button className={styles.max}>{150}</button>
				</a>
				<a href={'/leaderboard/'+(p+1)}>
					<button className={styles.right} />
				</a>
			</div>
		);
	}
	else {
		const numbers = [0, 1, 2, 3, 4, 5];
		const ActiveLeft = () => {
			return (
				<a href={'/leaderboard/'+(p-1)}>
					<button className={styles.left} />
				</a>
			);
		}
		const InactiveLeft = () => {
			return <button className={styles.leftInactive} />;
		}

		return (
			<div className={styles.main}>
				{(p == 0) ? <InactiveLeft /> : <ActiveLeft />}
				{numbers.map((n, i) => {
					if(i == p)
						return <button className={styles.active} key={i}>{i}</button>; 

					return (
						<a href={'/leaderboard/'+i} key={i}>
							<button className={styles.number}>{i}</button>
						</a>
					);
				})}
				<button className={styles.dots} />
				<a href={'/leaderboard/150'}>
					<button className={styles.max}>150</button>
				</a>
				<a href={'/leaderboard/'+(p+1)}>
					<button className={styles.right} />
				</a>

			</div>
		);
	}

	return <button />


}
export default LeaderboardNav;

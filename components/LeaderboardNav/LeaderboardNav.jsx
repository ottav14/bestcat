import styles from './LeaderboardNav.module.css';

const LeaderboardNav = ({ pageNumber }) => {

	const p = parseInt(pageNumber);
	const buttonCount1 = (window.innerWidth <= 768) ? 3 : 4;
	const buttonCount2 = (window.innerWidth <= 768) ? 3 : 6;

	if(p >= buttonCount2-1) {
		const numbers = Array.from({ length: buttonCount1 }, (_, i) => p-1+i);
		return (
			<div className={styles.main}>
				<a href={'/leaderboard/'+(p-1)}>
					<button className={styles.left} />
				</a>
				<a href={'/leaderboard/0'}>
					<button className={styles.min}>{0}</button>
				</a>
				<button className={styles.dots} />
				{numbers.map((n, i) => {
					if(i === 1)
						return <button className={styles.active} key={n}>{n}</button>

					return (
						<a href={'/leaderboard/'+n} key={n}>
							<button className={styles.number}>{n}</button>
						</a>
					);	
				})}
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
		const numbers = Array.from({ length: buttonCount2 }, (_, i) => i);
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

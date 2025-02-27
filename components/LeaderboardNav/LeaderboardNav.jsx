import styles from './LeaderboardNav.module.css';

const LeaderboardNav = ({ pageNumber }) => {

	const p = parseInt(pageNumber);
	const buttonCount1 = (window.innerWidth <= 768) ? 3 : 4;
	const buttonCount2 = (window.innerWidth <= 768) ? 3 : 6;

	const LeftButton = () => {
		return (
			<a href={'/leaderboard/'+(p-1)}>
				<button className={styles.left}>
					<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z"/></svg>
				</button>
			</a>
		);
	}

	const InactiveLeft = () => {
		return (
			<button className={styles.leftInactive}>
				<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z"/></svg>
			</button>
		);
	}

	const MinButton = () => {
		return (
			<a href={'/leaderboard/0'}>
				<button className={styles.min}>{0}</button>
			</a>
		);
	}

	const DotsButton = () => {
		return (
			<button className={styles.dots}>
				<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M207.86-432Q188-432 174-446.14t-14-34Q160-500 174.14-514t34-14Q228-528 242-513.86t14 34Q256-460 241.86-446t-34 14Zm272 0Q460-432 446-446.14t-14-34Q432-500 446.14-514t34-14Q500-528 514-513.86t14 34Q528-460 513.86-446t-34 14Zm272 0Q732-432 718-446.14t-14-34Q704-500 718.14-514t34-14Q772-528 786-513.86t14 34Q800-460 785.86-446t-34 14Z"/></svg>
			</button>
		);
	}

	const MaxButton = () => {
		return (
			<a href={'/leaderboard/150'}>
				<button className={styles.max}>{150}</button>
			</a>
		);
	}

	const RightButton = () => {
		return (
			<a href={'/leaderboard/'+(p+1)}>
				<button className={styles.right}>
					<svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF"><path d="M530-481 332-679l43-43 241 241-241 241-43-43 198-198Z"/></svg>
				</button>
			</a>
		);
	}

	if(p >= buttonCount2-1) {
		const numbers = Array.from({ length: buttonCount1 }, (_, i) => p-1+i);
		return (
			<div className={styles.main}>
				<LeftButton />
				<DotsButton />
				{numbers.map((n, i) => {
					if(i === 1)
						return <button className={styles.active} key={n}>{n}</button>

					return (
						<a href={'/leaderboard/'+n} key={n}>
							<button className={styles.number}>{n}</button>
						</a>
					);	
				})}
				<DotsButton />
				<MaxButton />
				<RightButton />
			</div>
		);
	}
	else {
		const numbers = Array.from({ length: buttonCount2 }, (_, i) => i);
		return (
			<div className={styles.main}>
				{(p === 0 && window.innerWidth > 768) ? <InactiveLeft /> : <LeftButton />}
				{numbers.map((n, i) => {
					if(i === p)
						return <button className={styles.active} key={i}>{i}</button>; 

					return (
						<a href={'/leaderboard/'+i} key={i}>
							<button className={styles.number}>{i}</button>
						</a>
					);
				})}
				<DotsButton />
				<MaxButton />
				<RightButton />
			</div>
		);
	}
	return <button />

}
export default LeaderboardNav;

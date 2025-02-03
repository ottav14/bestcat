import styles from './PageButton.module.css';

const PageButton = ({ pageNumber }) => {

	const inc = pageNumber+1;
	const dec = pageNumber-1;
	const forwardLink = `/leaderboard/${inc}`;
	const backLink = `/leaderboard/${dec}`;
	
	console.log(pageNumber);

	return (
		<div className={styles.main}>
			<a href={backLink}>
				<button 
					className={styles.backButton}
				/>
			</a>
			<a href={forwardLink}>
				<button 
					className={styles.forwardButton}
				/>
			</a>
		</div>
	);
}
export default PageButton;



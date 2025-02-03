import styles from './PageButton.module.css';

const PageButton = ({ pageNumber, enabled }) => {

	const inc = parseInt(pageNumber)+1;
	const dec = parseInt(pageNumber)-1;
	const forwardLink = `/leaderboard/${inc}`;
	const backLink = `/leaderboard/${dec}`;
	
	return (
		<div className={styles.main}>
			<a href={backLink}>
				<button 
					className={styles.backButton}
					style={{
						backgroundColor: 'black'
					}}
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

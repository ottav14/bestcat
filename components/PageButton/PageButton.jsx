import styles from './PageButton.module.css';

const PageButton = ({ action }) => {

	return (
		<div className={styles.main}>
			<button 
				className={styles.backButton}
				onClick={action}
			/>
			<button 
				className={styles.forwardButton}
				onClick={action}
			/>
		</div>
	);
}
export default PageButton;



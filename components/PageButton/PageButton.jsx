import styles from './PageButton.module.css';

const PageButton = ({ backgroundImage, action }) => {

	return (
		<button 
			className={styles.main}
			onClick={action}
			style={{ 
				'--bg-image': `url(${backgroundImage})`,
			}}
		/>
	);
}
export default PageButton;



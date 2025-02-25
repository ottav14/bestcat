import styles from './Button.module.css';

const Button = ({ backgroundImage, backgroundColor, action }) => {

	return (
		<button 
			className={styles.main}
			onClick={action}
			style={{ 
				'--bg-image': `url(${backgroundImage})`,
				'--bg-color': backgroundColor,
			}}
		/>
	);
}
export default Button;

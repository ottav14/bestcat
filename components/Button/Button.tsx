import Image from 'next/image';
import styles from './Button.module.css';

const Button = ({ children, backgroundImage, backgroundColor }) => {
	return (
		<button 
			className={styles.main}
			style={{ 
				'--bg-image': `url(${backgroundImage})`,
				'--bg-color': backgroundColor,
			}}
		/>
	);
}
export default Button;

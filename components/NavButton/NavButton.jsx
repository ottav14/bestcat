import styles from './NavButton.module.css';

const NavButton = ({ text, link }) => {

	return (
		<a href={link} className={styles.link}>
			<button className={styles.button}> 
				{text}
			</button>
		</a>
	);
}
export default NavButton;

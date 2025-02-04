'use client'

import styles from './NavBar.module.css';
import { usePathname } from "next/navigation";

const NavBar = () => {

	const pathname = usePathname();
	console.log(pathname);

	return (
		<div className={styles.main}>
			<a href='/'>
				<button className={pathname === '/' ? styles.active : styles.button}>Bestcat</button>
			</a>
			<a href='/leaderboard/0'>
				<button className={pathname === '/' ? styles.button : styles.active}>Leaderboard</button>
			</a>
		</div>
	);
}
export default NavBar;

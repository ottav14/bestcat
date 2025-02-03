'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './LoadingImage.module.css';

const LoadingImage = () => {

	const [onMobile, setOnMobile] = useState(false);

	useEffect(() => {
		setOnMobile(window.innerWidth <= 768);
	});
	const imageResolution = onMobile ? 256 : 512;

	return (
		<div className={styles.container}>
			<div className={styles.img} />
			Loading...
		</div>
	);
}
export default LoadingImage;

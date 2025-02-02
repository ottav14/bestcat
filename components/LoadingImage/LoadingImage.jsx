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
		<Image
			className={styles.img}
			src='/thumbs-up.svg'
			alt='Cat pic'
			width={imageResolution}
			height={imageResolution}
			priority={true}
		/>
	);
}
export default LoadingImage;

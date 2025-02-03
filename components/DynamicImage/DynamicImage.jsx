'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './DynamicImage.module.css';

const DynamicImage = ({ img }) => {

	const [onMobile, setOnMobile] = useState(false);

	useEffect(() => {
		setOnMobile(window.innerWidth <= 768);
	}, []);

	const imageResolution = onMobile ? 256 : 512;

	return (
		<Image
			className={styles.img}
			src={`data: image/jpeg; base64, ${img}`}
			alt='Cat pic'
			width={imageResolution}
			height={imageResolution}
			priority={true}
		/>
	);
}
export default DynamicImage;

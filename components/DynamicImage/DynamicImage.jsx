"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './DynamicImage.module.css';

const DynamicImage = ({ img }) => {

	const [imageBase64, setImageBase64] = useState('');

	useEffect(() => {
		setImageBase64(img);
	});
	
	if(imageBase64) {
		return (
			<Image
				src={`data: image/jpeg; base64, ${imageBase64}`}
				alt='Cat pic'
				width={512}
				height={512}
				priority={true}
			/>
		);
	}
	else {
		return <div className={styles.placeHolder} />;
	}
}
export default DynamicImage;

"use client"

import Image from 'next/image';
import styles from './DynamicImage.module.css';

const DynamicImage = ({ imageUrl }) => {
	
	if(imageUrl) {
		return (
			<Image
				src={imageUrl}
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

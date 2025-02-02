"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './LeaderboardEntry.module.css';

const LeaderboardEntry = ({ img, count }) => {

	const onMobile = (window.innerWidth <= 768);
	const imageResolution = onMobile ? 48 : 64;
	if(img) {
		return (
			<div className={styles.main}>
				<Image
					src={`data: image/jpeg; base64, ${img}`}
					alt='Cat pic'
					width={imageResolution}
					height={imageResolution}
					priority={true}
				/>
				<p className={styles.count}>{count}</p>
			</div>
		);
	}
	else {
		return <div className={styles.placeHolder} />;
	}
}
export default LeaderboardEntry;

"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './LeaderboardEntry.module.css';

const LeaderboardEntry = ({ img, count }) => {

	if(img) {
		return (
			<div className={styles.main}>
				<Image
					src={`data: image/jpeg; base64, ${img}`}
					alt='Cat pic'
					width={64}
					height={64}
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

"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { MongoClient } from 'mongodb';

const DynamicImage = () => {
	
	const [imageId, setImageId] = useState(0);
	const [imageUrl, setImageUrl] = useState('');

	useEffect(() => {

		const fetchImage = async () => {
			const response = await fetch("/api/id"); 
			const data = await response.json();
			const url = `/api/image/${data.imageId}`;
			setImageUrl(url);
			console.log(data.imageId);
		};
		fetchImage();

	}, []);

	if(imageUrl) {
		return (
			<Image
				src={imageUrl}
				alt='Cat pic'
				width={512}
				height={512}
			/>
		);
	}
	else {
		return <div />;
	}
}
export default DynamicImage;

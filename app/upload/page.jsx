'use client'

import styles from './page.module.css';
import { useState } from 'react';
import Image from 'next/image';

const Upload = () => {

	const [image, setImage] = useState(null);

	const attemptSubmission = () => {
		
	}

	const getBase64FromUrl = async (imageUrl) => {
		const response = await fetch(imageUrl);
		const blob = await response.blob();

		return new Promise((resolve) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.readAsDataURL(blob);
		});
	}

	const handleFileChange = async (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];

			// Check if the file is an image
			if (!file.type.startsWith("image/")) {
				alert("Please upload an image file.");
				return;
			}

			// Store the image as a preview URL
			const imageUrl = URL.createObjectURL(file);
			const base64 = await getBase64FromUrl(imageUrl);
			setImage(base64);
			document.getElementById('submit').disabled = false;
			document.getElementById('submit').addEventListener('click', attemptSubmission);

		}
	};

	const Submission = () => {

		if(image) {
			console.log(image);
			return (
				<Image 
					className={styles.img} 
					src={image}
					alt='Uploaded picture'
					width={window.innerWidth*0.4}
					height={window.innerWidth*0.4}
				/>
			);
		}

		return (
			<div>
				<label htmlFor='file-upload' className={styles.input}>
					<p className={styles.inputLabel}>Select an image :3</p>
				</label>
				<input
					id='file-upload'
					type='file'
					onChange={handleFileChange}
					hidden
				/>
			</div>
		);
	}

	return (

		<main className={styles.main}>
			<div className={styles.submission}>
				<Submission />
				<button className={styles.submitButton} id='submit' disabled>Submit</button>
			</div>
		</main>

	);

}
export default Upload;

'use client'

import styles from './page.module.css';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const Upload = () => {

	const [image, setImage] = useState(null);
	const [name, setName] = useState('');
	const [breed, setBreed] = useState('');

	useEffect(() => {
		const submitButton = document.getElementById('submit');
		if(image && name && breed) {
			submitButton.disabled = false;
			submitButton.addEventListener('click', attemptSubmission);
		}
		else
			submitButton.disabled = true;
		console.log(image, name, breed);
	}, [image, name, breed]);

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

		}

	};

	const handleNameChange = (e) => {
		setName(e.target.value);
	}

	const handleBreedChange = (e) => {
		setBreed(e.target.value);
	}

	const Submission = () => {

		if(image) {
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
				<input
					className={styles.nameInput}
					type='text'
					onChange={handleNameChange}
					placeholder='Name'
				/>
				<input
					className={styles.breedInput}
					type='text'
					onChange={handleBreedChange}
					placeholder='Breed'
				/>
				<button className={styles.submitButton} id='submit' disabled>Submit</button>
			</div>
		</main>

	);

}
export default Upload;

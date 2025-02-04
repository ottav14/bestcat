'use client'

import styles from './page.module.css';
import { useState } from 'react';
import Image from 'next/image';
import LoadingImage from '../../components/LoadingImage/LoadingImage.jsx';

const Upload = () => {

	const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
	const [filename, setFilename] = useState('No image selected.');

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];


            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

	const PreviewImage = () => {

		if(preview) {
			return (
				<div className={styles.preview}>
					<Image
						src={preview}
						alt='preview'
						width={512}
						height={512}
					/>
				</div>
			);
		}

		return (
			<div className={styles.preview}>
				<LoadingImage message='Please select an image :3' />
			</div>
		);


	}
	
	return (
		<main className={styles.main}>
			<div className={styles.interface}>
				<PreviewImage />
				<div className={styles.controls}>
					<input id='imageInput' type='file' accept='image/*' onChange={handleFileChange} className={styles.inputField} hidden />
					<label htmlFor='imageInput' className={styles.inputField}>Select image</label>
					<button className={styles.submitButton}>Submit</button>
				</div>
			</div>
		</main>
	);

}
export default Upload;

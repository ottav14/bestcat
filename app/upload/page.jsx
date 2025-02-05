'use client'

import styles from './page.module.css';

const Upload = () => {

	const handleFileChange = (event) => {
		
	}

	return (

		<main className={styles.main}>
			<div className={styles.interface}>
				<label htmlFor='file-upload' className={styles.input}>
					<div className={styles.inputImage} />
					<div className={styles.inputLabel}>
						Select an image :3
					</div>
				</label>
				<input
					id='file-upload'
					type='file'
					onChange={handleFileChange}
					hidden
				/>
			</div>
		</main>

	);

}
export default Upload;

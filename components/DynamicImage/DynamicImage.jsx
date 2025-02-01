import Image from 'next/image';
import styles from './DynamicImage.module.css';

const DynamicImage = ({ img }) => {

	if(img) {
		return (
			<Image
				className={styles.img}
				src={`data: image/jpeg; base64, ${img}`}
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

import styles from './page.module.css';
import Button from '../components/Button/Button.jsx';
import DynamicImage from '../components/DynamicImage/DynamicImage.jsx';
import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const imageCount = 2403;

const Home = async () => {

	const client = new MongoClient(uri);
	await client.connect();

	const db = client.db('photos'); 
	const collection = db.collection('fs.files'); 

	const randomIndex = Math.floor(Math.random() * imageCount);

	const randomImage = await collection.find().skip(randomIndex).limit(1).next();
	const imageId = randomImage._id;

	const bucket = new GridFSBucket(db);
	const fileId = new ObjectId(imageId);

	const downloadStream = bucket.openDownloadStream(fileId);

	const streamToBuffer = async (stream) => {
		const chunks = [];
		for await (const chunk of stream) {
			chunks.push(chunk);
		}
		return Buffer.concat(chunks);
	};

	const buffer = await streamToBuffer(downloadStream);
	const base64 = buffer.toString('base64');

	return (
		<div className={styles.page}>
			<main className={styles.main}>
				<div className={styles.interfaceContainer}>
					<DynamicImage img={base64} />
					<div className={styles.buttonContainer}>
						<Button 
							backgroundImage='/thumbs-up.svg' 
							backgroundColor='#0f0'
						/>
						<Button 
							backgroundImage='/thumbs-down.svg' 
							backgroundColor='#f00'
						/>
					</div>
				</div>
			</main>
		</div>
	);
}
export default Home;

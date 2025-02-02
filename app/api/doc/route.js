import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import fetchImage from '../../../scripts/fetchImage.js';

const uri = process.env.MONGODB_URI;
const imageCount = 2403;

export async function GET() {

	const client = new MongoClient(uri);
	try {
		await client.connect();

		const db = client.db('photos'); 
		const image_collection = db.collection('fs.files'); 
		const counts_collection = db.collection('counts');

		const randomIndex = Math.floor(Math.random() * imageCount);

		const randomImage = await image_collection.find().skip(randomIndex).limit(1).next();
		const imageId = randomImage._id;
		const fileId = new ObjectId(imageId);

		// Fetch count
		const getCount = async (id) => { 
			const countJSON = await counts_collection.findOne({ _id: id });
			return countJSON.value;
		};
		const currentCount = await getCount(fileId);

		// Fetch image
		const base64 = await fetchImage(client, fileId);

		const responseJSON = {
			imageBase64: base64,
			count: currentCount,
			id: imageId
		};

		return new Response(JSON.stringify(responseJSON), { 
			status: 200, 
			headers: { 'Content-Type': 'application/json' }
		});
	} catch(error) {
		console.error(error);
		return new Response(JSON.stringify(error.message), { 
			status: 500, 
			headers: { 'Content-Type': 'application/json' }
		});
	} finally {
		await client.close();
	}
}

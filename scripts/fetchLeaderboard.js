import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import fetchImage from './fetchImage.js';

const fetchLeaderboard = async (client) => {

	try {
		const db = client.db('photos'); 
		const photo_collection = db.collection('fs.files'); 
		const count_collection = db.collection('counts'); 

		const ids = await count_collection
			.find({}, { projection: { _id: 1, value: 0 } })
			.sort({ value: -1 })
			.limit(10)
			.toArray();

		const images = [];
		for(let i=0; i<ids.length; i++) {
			const base64 = await fetchImage(client, ids[i]._id);
			images.push(base64);
		}

		return images;

	}
	catch(error) {
		console.error(error);
	}
	finally {
		await client.close();
	}

}
export default fetchLeaderboard;

import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import fetchImage from './fetchImage.js';
import fetchCount from './fetchCount.js';

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

		const objs = [];
		for(let i=0; i<ids.length; i++) {
			const imageBase64 = await fetchImage(client, ids[i]._id);
			const countObj = await count_collection.findOne({ _id: ids[i]._id }, { projection: { _id: 0, value: 1 } });
			const imageCount = countObj.value;
			const obj = {
				count: imageCount,
				base64: imageBase64
			};
			objs.push(obj);
		}

		return objs;

	}
	catch(error) {
		console.error(error);
	}
	finally {
		await client.close();
	}

}
export default fetchLeaderboard;

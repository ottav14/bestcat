import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const initCounts = async () => {

	const client = new MongoClient(uri);
	try {
		await client.connect();

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
			
		}

	}
	catch(error) {
		console.error(error);
	}
	finally {
		await client.close();
	}

}
initCounts();

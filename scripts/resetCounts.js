import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const initCounts = async () => {

	const client = new MongoClient(uri);
	try {
		await client.connect();

		const db = client.db('photos'); 
		const photo_collection = db.collection('fs.files'); 
		db.collection('counts').drop(); 

		const ids = await photo_collection.find({}, { projection: { _id: 1 } }).toArray();

		for(let i=0; i<ids.length; i++) {
			const newEntry = {
				_id: ids[i]._id, 
				value: 0 
			};
			await db.collection('counts').insertOne(newEntry);
			console.log('initialized:', ids[i]);
		}
		console.log('succeeded');
	}
	catch(error) {
		console.error('error failed to init counts:', error);
	}
	finally {
		await client.close();
	}

}
initCounts();

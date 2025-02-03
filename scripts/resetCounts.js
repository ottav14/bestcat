import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const resetCounts = async () => {

	const client = new MongoClient(uri);
	try {
		await client.connect();

		const db = client.db('photos'); 
		const collection = db.collection('fs.files');
		collection.updateMany({}, { $set: { count: 0 } });
	}
	catch(error) {
		console.error(error);
	}
	finally {
		await client.close();
	}

}
resetCounts();

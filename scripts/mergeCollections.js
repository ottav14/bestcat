import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const mergeCollections = async () => {

	const client = new MongoClient(uri);
	try { 
		await client.connect();
		const db = client.db('photos'); 
		const photo_collection = db.collection('fs.files'); 
		const count_collection = db.collection('counts'); 

		const counts = await count_collection.find({}).toArray();

		for(let i=0; i<counts.length; i++) {
			await photo_collection.updateOne(
				{ _id: counts[i]._id }, 
				{ $set: { count: counts[i].value } }
			);
			console.log(`Updated: ${counts[i]._id}`);
		}

	} catch(error) {
		console.error(error);
	} finally {
		client.close();
	}
}
mergeCollections();

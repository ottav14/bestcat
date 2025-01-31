import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

const fetchCount = async (client, id) => {

	try {
		await client.connect();

		const db = client.db('photos'); 
		const collection = db.collection('counts'); 
		
		const countObj = await collection.findOne({ _id: id }, { projection: { _id: 0, value: 1 } });
		const count = countObj.value;

		return count;
	} 
	catch(error) {
		console.error(error);
	}
	finally {
		await client.close();
	}

}
export default fetchCount;

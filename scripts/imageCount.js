import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const getImageCount = async () => {
	
	const client = new MongoClient(uri);
	await client.connect();

	const db = client.db('photos'); 
	const collection = db.collection('fs.files'); 

	const imageCount = await collection.countDocuments({});
	console.log(imageCount);
	
	await client.close();

}
getImageCount();

	

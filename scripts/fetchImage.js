import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const imageCount = 2403;

const fetchImage = async () => {

	const client = new MongoClient(uri);
	await client.connect();

	const db = client.db('photos'); 
	const collection = db.collection('fs.files'); 

	const randomIndex = Math.floor(Math.random() * imageCount);
	const randomImage = await collection.find().skip(randomIndex).limit(1).next();

	if(randomImage) {
		return randomImage._id;
	}
	else {
		console.log('error: could not get photo id');
		return -1;
	}

}
export default fetchImage;

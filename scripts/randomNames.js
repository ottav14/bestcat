import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import { readFile } from 'fs/promises';

const uri = 'mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const readNames = async () => {
	const filePath = './data/cat-names.json';
	try {
		const data = await readFile(filePath, 'utf8');
		const jsonData = JSON.parse(data);
		return jsonData;
	} catch (err) {
		console.error('Error reading file:', err);
	}
}

const randomNames = async () => {

	const client = new MongoClient(uri);
	const names = await readNames();
	try {
		await client.connect();

		const db = client.db('photos'); 
		const collection = db.collection('fs.files'); 

		const ids = await collection.find({}, { projection: { _id: 1 }  }).toArray();

		for(let i=0; i<ids.length; i++) {
			const newName = names[Math.floor((ids.length-1)*Math.random())];
			await collection.updateOne({ _id: ids[i]._id }, { $set: { name: newName } });
			console.log('Randomized:', ids[i]);
		}
		console.log('Success.');

	}
	catch(error) {
		console.error(error);
	}
	finally {
		await client.close();
	}

}
randomNames();

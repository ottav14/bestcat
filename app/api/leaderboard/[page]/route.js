import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

const streamToBuffer = async (stream) => {
	const chunks = [];
	for await (const chunk of stream) {
		chunks.push(chunk);
	}
	return Buffer.concat(chunks);
};

export async function GET(request, { params }) {

	const { page } = await params;
	const client = new MongoClient(uri);
	await client.connect();

	const db = client.db('photos'); 
	const image_collection = db.collection('fs.files'); 
	const count_collection = db.collection('counts');

	const bucket = new GridFSBucket(db);

	const ids = await count_collection
		.find({}, { projection: { _id: 1, value: 0 } })
		.sort({ value: -1 })
		.limit(10)
		.toArray();

	const objs = [];
	for(let i=0; i<ids.length; i++) {
		const downloadStream = bucket.openDownloadStream(ids[i]._id);
		const buffer = await streamToBuffer(downloadStream);
		const imageBase64 = buffer.toString('base64');

		const countObj = await count_collection.findOne({ _id: ids[i]._id }, { projection: { _id: 0, value: 1 } });
		const imageCount = countObj.value;
		const obj = {
			count: imageCount,
			base64: imageBase64,
			id: ids[i]._id
		};
		objs.push(obj);
	}

	await client.close();

	return new Response(JSON.stringify(objs), { 
		status: 200, 
		headers: { 
			'Content-Type': 'application/json',
		}
	});

}


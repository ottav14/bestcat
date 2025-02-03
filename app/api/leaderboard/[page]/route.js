import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const entryCount = 15;
const imageCount = 2403;

const streamToBuffer = async (stream) => {
	const chunks = [];
	for await (const chunk of stream) {
		chunks.push(chunk);
	}
	return Buffer.concat(chunks);
};

export async function GET(request, { params }) {

	const { page } = await params;

	if(entryCount*page >= imageCount || page < 0) {
		return new Response(JSON.stringify({ error: 'invalid index' }), { 
			status: 404, 
			headers: { 
				'Content-Type': 'application/json',
			}
		});
	}

	const client = new MongoClient(uri);
	await client.connect();

	const db = client.db('photos'); 
	const collection = db.collection('fs.files'); 

	const bucket = new GridFSBucket(db);

	const docs = await collection
		.find()
		.sort({ count: -1 })
		.skip(entryCount*page)
		.limit(entryCount)
		.toArray();

	const objs = [];
	for(let i=0; i<docs.length; i++) {
		const downloadStream = bucket.openDownloadStream(docs[i]._id);
		const buffer = await streamToBuffer(downloadStream);
		const imageBase64 = buffer.toString('base64');

		const obj = {
			count: docs[i].count,
			base64: imageBase64,
			id: docs[i]._id,
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


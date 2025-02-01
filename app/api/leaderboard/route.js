import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';

const uri = 'mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const imageCount = 2403;

export async function GET() {

	const client = new MongoClient(uri);
	await client.connect();

	const db = client.db('photos'); 
	const image_collection = db.collection('fs.files'); 
	const counts_collection = db.collection('counts');

	const randomIndex = Math.floor(Math.random() * imageCount);

	const randomImage = await image_collection.find().skip(randomIndex).limit(1).next();
	const imageId = randomImage._id;
	const fileId = new ObjectId(imageId);

	// Fetch count
	const getCount = async (id) => { 
		const countJSON = await counts_collection.findOne({ _id: fileId });
		return countJSON.value;
	};
	const currentCount = await getCount(imageId);

	// Fetch image
	const bucket = new GridFSBucket(db);
	const downloadStream = bucket.openDownloadStream(fileId);

	const streamToBuffer = async (stream) => {
		const chunks = [];
		for await (const chunk of stream) {
			chunks.push(chunk);
		}
		return Buffer.concat(chunks);
	};

	const buffer = await streamToBuffer(downloadStream);
	const base64 = buffer.toString('base64');

	const responseJSON = {
		imageBase64: base64,
		count: currentCount
	};

	return new Response(JSON.stringify(responseJSON), { 
		status: 200, 
		headers: { 
			'Content-Type': 'application/json' 
			"Cache-Control": "no-store, max-age=0, must-revalidate" 
		}
	});
}

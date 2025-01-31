import { GridFSBucket, ObjectId } from 'mongodb';

const fetchImage = async (client, id) => {

	const db = client.db('photos'); 
	const collection = db.collection('fs.files'); 

	const bucket = new GridFSBucket(db);
	const downloadStream = bucket.openDownloadStream(id);

	const streamToBuffer = async (stream) => {
		const chunks = [];
		for await (const chunk of stream) {
			chunks.push(chunk);
		}
		return Buffer.concat(chunks);
	};

	const buffer = await streamToBuffer(downloadStream);
	const base64 = buffer.toString('base64');

	return base64;

}
export default fetchImage;

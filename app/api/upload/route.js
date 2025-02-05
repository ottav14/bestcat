import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST(req) {

	const client = new MongoClient(uri);
	try {
		const reqJSON = await req.json();
		console.log(reqJSON);

		await client.connect();

		const db = client.db('submissions'); 
		const collection = db.collection('fs.files');
		const bucket = new GridFSBucket(db);
		const uploadStream = bucket.openUploadStream('test');



	}
	catch(error) {
		return NextResponse.json({ _error: error }, { status: 500 });
	}
	finally {
		client.close();
	}
}

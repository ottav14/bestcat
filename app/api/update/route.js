import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST(req) {

	const client = new MongoClient(uri);
	try {
		const reqJSON = await req.json();
		const id = reqJSON.id;
		const parity = reqJSON.parity;

		if(!ObjectId.isValid(id)) {
			return NextResponse.json({ error: 'invalid id' }, { status: 400 });
		}

		const fileId = new ObjectId(id);
		await client.connect();

		const db = client.db('photos'); 
		const collection = db.collection('counts');

		if(parity === '1') {
			await collection.updateOne({ _id: fileId }, { $inc: { value: 1 } });
			return NextResponse.json({ message: `Successfully incremented: ${id}` }, { status: 200 });
		}
		else if(parity === '-1') {
			await collection.updateOne({ _id: fileId }, { $inc: { value: -1 } });
			return NextResponse.json({ message: `Successfully decremented: ${id}` }, { status: 200 });
		}
		else {
			return NextResponse.json({ message: `Invalid parity: ${parity}` }, { status: 400 });
		}


	}
	catch(error) {
		return NextResponse.json({ _error: error }, { status: 500 });
	}
	finally {
		client.close();
	}
}

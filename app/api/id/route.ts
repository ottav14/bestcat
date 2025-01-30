import { MongoClient, GridFSBucket } from 'mongodb';
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI; 

export async function GET(request) {
	
	const client = new MongoClient(uri);
	try {
		await client.connect();

		const db = client.db('photos'); 
		const bucket = new GridFSBucket(db); 
		const collection = db.collection('fs.files'); 

		const imageCount = await collection.countDocuments({});
		const randomIndex = Math.floor(Math.random() * imageCount);

		const randomImage = await collection.find().skip(randomIndex).limit(1).next();

		return new Response(JSON.stringify({ imageId: randomImage._id }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Error fetching id:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch id' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	} finally {
		if (client) {
			await client.close();
		}
	}
}

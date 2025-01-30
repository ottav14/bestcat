import { MongoClient, GridFSBucket, ObjectId } from 'mongodb';
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI; 

export async function GET(request, { params }) {
	const { id } = await params; 

	const client = new MongoClient(uri);
	try {
		await client.connect();

		const db = client.db('photos'); 
		const bucket = new GridFSBucket(db); 

		const fileId = new ObjectId(id); 
		const downloadStream = bucket.openDownloadStream(fileId);

		const streamToBuffer = async (stream) => {
			const chunks = [];
			for await (const chunk of stream) {
				chunks.push(chunk);
			}
			return Buffer.concat(chunks);
		};

		const buffer = await streamToBuffer(downloadStream);

		return new NextResponse(buffer, {
			status: 200,
			headers: {
				"Content-Type": "image/jpg", 
				"Content-Length": buffer.length.toString(),
			},
		});

	} catch (error) {
		console.error('Error fetching image:', error);
		return new Response(JSON.stringify({ error: 'Failed to fetch image' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' },
		});
	} finally {
		if (client) {
			await client.close();
		}
	}
}

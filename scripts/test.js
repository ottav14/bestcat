const { MongoClient, GridFSBucket } = require("mongodb");
const fs = require("fs");

const uri = "mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const databaseName = "photos"; 

async function fetchImage(filename) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(databaseName);
    const bucket = new GridFSBucket(db);

    const downloadStream = bucket.openDownloadStreamByName(filename);
    const writeStream = fs.createWriteStream(`./${filename}`);

    downloadStream.pipe(writeStream);

    downloadStream.on("error", (err) => {
      console.error("Error downloading file:", err);
    });

    writeStream.on("finish", () => {
      console.log(`Image ${filename} downloaded successfully.`);
      client.close();
    });

  } catch (err) {
    console.error("Error:", err);
  }
}

// Fetch the image (Replace 'image.png' with your actual image filename)
fetchImage("Bombay_78.jpg");


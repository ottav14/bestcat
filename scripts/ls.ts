import { MongoClient } from "mongodb";

const uri = "mongodb+srv://dom:<db_password>@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
const dbName = "<YOUR_DATABASE_NAME>"; // Replace with your database name
const collectionName = "<YOUR_COLLECTION_NAME>"; // Replace with your collection name

async function fetchFileNames() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    console.log("Connected to MongoDB Atlas!");

    // Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Query the collection for file names
    const files = await collection.find({}).project({ name: 1, _id: 0 }).toArray();

    // Log the file names
    console.log("File Names:");
    files.forEach(file => {
      console.log(file.name);
    });

  } catch (error) {
    console.error("Error fetching file names:", error);
  } finally {
    // Close the connection
    await client.close();
    console.log("Connection closed.");
  }
}

// Run the function
fetchFileNames().catch(console.error);


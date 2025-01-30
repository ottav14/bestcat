import os
from pymongo import MongoClient
from gridfs import GridFS

# MongoDB connection URI
uri = "mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  
client = MongoClient(uri)

# Access your database and initialize GridFS
db = client['photos']  
fs = GridFS(db)

file = fs.find_one({"filename": "Bombay_2.jpg"})  

if file:
    with open("../data/test/test.jpg", "wb") as f:
        f.write(file.read())
    print("File retrieved and saved successfully.")


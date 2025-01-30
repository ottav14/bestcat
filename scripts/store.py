import os
from pymongo import MongoClient
from gridfs import GridFS

# MongoDB connection URI
uri = "mongodb+srv://dom:5467@cluster0.ilori.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"  
client = MongoClient(uri)

# Access your database and initialize GridFS
db = client['photos']  
fs = GridFS(db)

# Directory containing photos
photo_dir = "../data/images"  # Replace with the directory containing your photos

# Upload all photos to GridFS
for filename in os.listdir(photo_dir):
    filepath = os.path.join(photo_dir, filename)
    if os.path.isfile(filepath):
        with open(filepath, "rb") as f:
            file_id = fs.put(f, filename=filename)
            print(f"Uploaded {filename} with file_id {file_id}")

print("All photos uploaded successfully.")


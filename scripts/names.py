import json

with open("data/seattle-pets.json", "r", encoding="utf-8") as file:
    dataJSON = json.load(file)

data = dataJSON["data"]
names = [];
for row in data:
    if row[11] == "Cat" and row[10] and row[10].isalpha():
        names.append(row[10]);

with open("data/output.json", "w", encoding="utf-8") as file:
    json.dump(names, file, indent=4)

print("Successful.")  


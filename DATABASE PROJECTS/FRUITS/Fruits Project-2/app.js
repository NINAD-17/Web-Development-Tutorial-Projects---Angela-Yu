const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const dbName = "fruitsDB";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const db = client.db(dbName);

    // Establish and verify connection
    await db.command({ ping: 1 });
    console.log("Connected successfully to server");

    const collection = db.collection("fruits");

    // Insert documents
    const docs = [
      { name: "Watermelon", score: 7, review: "Juicy and sweet!" },
      { name: "Mango", score: 8, review: "Delicious fruit" },
      { name: "Avocado", score: 6, review: "Taste plain" }
    ];

    const insertManyresult = await collection.insertMany(docs);
    let ids = insertManyresult.insertedIds;

    console.log(`${insertManyresult.insertedCount} documents were inserted.`);

    for (let id of Object.values(ids)) {
      console.log(`Inserted a document with id ${id}`);
    }

    // Read documents
    // Query for fruit that have a score greater than 6
    const query = { score: { $gt: 6 } };
    const options = {
      // sort returned documents in ascending order by title (A->Z)
      sort: { name: 1 },
      // Include only the `title` and `imdb` fields in each returned document
      projection: { _id: 0, name: 1, score: 1, review: 1 },
    };

    const cursor = collection.find(query, options);
    // print a message if no documents were found
    if ((await cursor.count) === 0) {
      console.log("No documents found!");
    }

    // replace console.dir with your callback to access individual elements
    await cursor.forEach(console.dir);

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

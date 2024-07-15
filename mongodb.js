const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

async function dbConnection() {
  let result = await client.connect();
  let db = result.db("local");
  return db.collection("test");
  // let response = await collection.find({}).toArray();
  // console.log(response);
}

module.exports=dbConnection;
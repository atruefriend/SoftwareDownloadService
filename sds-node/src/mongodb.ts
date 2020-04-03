const MongoClient = require("mongodb").MongoClient;
const connString =
  "mongodb+srv://dbNikhil:pass123@nik-nsfuu.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "SoftwareDownloadServie";

async function initialize(collectionName: string) {
  try {
    // const client = new MongoClient(connString, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    // });
    const client = await MongoClient.connect(connString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const collection = await client.db(dbName).collection(collectionName);
    console.log("[MongoDB connection] SUCCESS");

    // perform actions on the collection object
    //client.close();
    console.log("connection closed");
    return collection;
  } catch (err) {
    console.log("[MongoDB connection] ERROR: " + err);
    return err;
  }
}

async function getData(collectionName: string) {
  try {
    const dbCollection = await initialize(collectionName);
    const result = await dbCollection.find();
    dbCollection.client.close();
    return JSON.stringify(result);
  } catch (err) {
    return err;
  }
}

export const methods = {
  initialize,
  getData
};

export default methods;

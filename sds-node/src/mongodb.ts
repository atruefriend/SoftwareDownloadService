const mongoose = require("mongoose");
import softwareRequest from "./models/SoftwareRequest";
import SoftwareRequest from "./models/SoftwareRequest";
const connString =
  "mongodb+srv://dbNikhil:pass123@nik-nsfuu.mongodb.net/SoftwareDownloadService?retryWrites=true&w=majority";
const options = { useNewUrlParser: true, useUnifiedTopology: true };
export let connection: any = null;

//Connect with mongodb. If already connected it will not try to connect again. But if recoonect is true it will forcefully connect.
async function connect(reconnect: boolean = false) {
  if (!connection || reconnect) {
    await mongoose.connect(connString, options, (err: object, res: object) => {
      if (err) {
        console.log("Not able to connect to database. Error : " + err);
      } else {
        console.log("Successfully connected with database.");
        connection = mongoose.connection;
      }
    });
  } else {
    console.log("You are already connected with database.");
  }
}

async function createSoftwareRequest(params: any) {
  return await SoftwareRequest.createSoftwareRequest(params);
}

async function fetchSoftwareRequests(id: any, softwareName: string) {
  return await SoftwareRequest.fetchSoftwareRequests(id, softwareName);
}

async function approveRequest(params: any) {
  return await SoftwareRequest.approveRequest(params);
}

export default {
  connect,
  createSoftwareRequest,
  fetchSoftwareRequests,
  approveRequest,
};

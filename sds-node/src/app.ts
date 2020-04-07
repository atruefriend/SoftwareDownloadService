import express from "express";
const bodyParser = require("body-parser");
import db from "./db";
import mdb from "./mongodb";
const sql = require("mssql");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//middleware function: it will always fire before all requests
const mongoConnection = async (req: any, res: any, next: () => void) => {
  await mdb.connect();
  next();
};
app.use(mongoConnection);

app.get("/", async function (req, res) {
  res.send("Get request executed successfully!");
});

app.get("/getRequests", async function (req, res) {
  const queryString = req.query;
  const softwareName = queryString.softwareName;
  const requestId = queryString.requestId;

  await mdb
    .fetchSoftwareRequests(requestId, softwareName)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => res.send(err));
});

app.post("/", function (req, res, next) {
  res.send("Post request executed successfully!");
});

app.post("/newRequest", async function (req, res) {
  const softwareName = req.body.softwareName;
  const tags = req.body.tags;
  const downloadUrl = req.body.downloadUrl;
  const version = req.body.version;
  const reason = req.body.reason;
  const isFree = req.body.isFree;
  const teamLead = req.body.teamLead;
  const userId = 1;

  const params = {
    userId: userId,
    softwareName: softwareName,
    tags: tags,
    downloadUrl: downloadUrl,
    version: version,
    reason: reason,
    isFree: isFree,
    teamLead: teamLead,
  };

  let result = await mdb.createSoftwareRequest(params);

  if (result === null || result === undefined) {
    res.send("Request created successfully!");
  } else {
    res.send("Error occurred :" + result);
  }
});

app.post("/approveRequest", async function (req, res) {
  const requestId = req.body.requestId;
  const comments = req.body.comments;
  const downloadLocation = req.body.downloadLocation;
  const stateId = req.body.stateId;
  const userId = 1;

  const params = {
    userId: userId,
    requestId: requestId,
    comments: comments,
    downloadLocation: downloadLocation,
    stateId: stateId,
  };

  let result = await mdb.approveRequest(params);

  if (result === null || result === undefined) {
    res.send("Request approved successfully!");
  } else {
    res.send("Error occurred :" + result);
  }
});

app.listen(port, function (err) {
  if (err) {
    return console.log(err);
  }
  return console.log("App is running successfully on port: " + port);
});

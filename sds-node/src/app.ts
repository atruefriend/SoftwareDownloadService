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

app.get("/", async function(req, res) {
  const data = await mdb.getData("SoftwareRequests");
  console.log("response: " + data);
  res.send("Get request executed successfully!");
});

app.get("/getRequests", async function(req, res) {
  const queryString = req.query;
  const softwareName = queryString.softwareName;
  const requestId = queryString.requestId;

  const params = [];
  if (softwareName !== undefined) {
    params.push({
      name: "SoftwareName",
      value: softwareName,
      type: sql.VarChar(500)
    });
  }
  if (requestId !== undefined) {
    params.push({
      name: "RequestID",
      value: requestId,
      type: sql.Int
    });
  }
  const data = await db.callStoredProcedure("GetRequets", params);
  res.send(data);
});

app.post("/", function(req, res, next) {
  res.send("Post request executed successfully!");
});

app.post("/newRequest", async function(req, res) {
  const softwareName = req.body.softwareName;
  const tags = req.body.tags;
  const downloadUrl = req.body.downloadUrl;
  const version = req.body.version;
  const reason = req.body.reason;
  const isFree = req.body.isFree;
  const teamLead = req.body.teamLead;
  const userId = 1;

  const params = [
    { name: "UserID", value: userId, type: sql.Int },
    { name: "SoftwareName", value: softwareName, type: sql.VarChar(500) },
    { name: "Tags", value: tags, type: sql.VarChar(500) },
    { name: "DownloadUrl", value: downloadUrl, type: sql.VarChar(500) },
    { name: "Version", value: version, type: sql.VarChar(200) },
    { name: "Reason", value: reason, type: sql.VarChar(1000) },
    { name: "FreePaid", value: isFree, type: sql.Int },
    { name: "TeamLead", value: teamLead, type: sql.Int }
  ];

  const result = await db.callStoredProcedure("AddRequest", params);

  res.send("Request created successfully!");
});

app.listen(port, function(err) {
  if (err) {
    return console.log(err);
  }
  return console.log("App is running successfully on port: " + port);
});

const mongoose = require("mongoose");
import mdb, { connection } from "../mongodb";
const collection = "softwarerequests";
let model: any;

const softwareRequestSchema = new mongoose.Schema({
  UserID: { type: Number },
  SoftwareName: { type: String, required: true },
  Tags: { type: String },
  DownloadUrl: { type: String },
  Version: { type: String },
  Reason: { type: String, required: true },
  FreePaid: { type: Number },
  TeamLead: { type: Number },
  DownloadLocation: { type: String },
  CreatedOn: { type: Date, default: Date.now },
  RequestState: {
    StateID: { type: Number },
    ModifiedBy: { type: Number },
    ModifiedDate: { type: Date, default: Date.now },
    Comments: { type: String }
  }
});

function constructModel() {
  model = connection.model(collection, softwareRequestSchema);
}

async function createSoftwareRequest(params: any) {
  if (!model) {
    constructModel();
  }
  const newRequest = new model({
    UserID: params.userId,
    SoftwareName: params.softwareName,
    Tags: params.tags,
    DownloadUrl: params.downloadUrl,
    Version: params.version,
    Reason: params.reason,
    FreePaid: params.isFree,
    TeamLead: params.teamLead,
    RequestState: {
      StateID: 1,
      ModifiedBy: params.userId
    }
  });

  newRequest.save();
}

async function fetchSoftwareRequests(id: any, softwareName: string) {
  if (!model) {
    constructModel();
  }
  let query;
  if (id !== null && id !== undefined) {
    query = model.findById(id);
  } else if (softwareName !== null && softwareName !== undefined) {
    query = model.find({
      SoftwareName: { $regex: ".*" + softwareName + ".*", $options: "i" }
    });
  } else {
    query = model.find({});
  }

  const response = await query.sort({ CreatedOn: "desc" }).exec();
  return response;
}

export default {
  createSoftwareRequest,
  fetchSoftwareRequests
};

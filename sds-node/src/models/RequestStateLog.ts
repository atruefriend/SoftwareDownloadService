const mongoose = require("mongoose");
import { connection } from "../mongodb";
import mail from "../mail";
const collection = "requeststatelog";
let model: any;

const RequestStateLogSchema = new mongoose.Schema({
  RequestID: { type: String },
  StateID: { type: Number },
  ModifiedBy: { type: Number },
  ModifiedDate: { type: Date, default: Date.now },
  Comments: { type: String }
});

function constructModel() {
  model = connection.model(collection, RequestStateLogSchema);
}

async function createRequestStateLog(params: any) {
  if (!model) {
    constructModel();
  }

  const log = new model({
    RequestID: params._id,
    StateID: params.RequestState.StateID,
    ModifiedBy: params.RequestState.ModifiedBy,
    ModifiedDate: params.RequestState.ModifiedDate
  });

  await mail
    .sendMail(params)
    .catch(err => console.log("Error occured in sending mail :" + err));

  log.save();
}

export default {
  createRequestStateLog
};

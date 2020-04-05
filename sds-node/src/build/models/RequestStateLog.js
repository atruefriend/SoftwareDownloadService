"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongodb_1 = require("../mongodb");
var collection = "requeststatelog";
var model;
var RequestStateLogSchema = new mongoose.Schema({
    RequestID: { type: String },
    StateID: { type: Number },
    ModifiedBy: { type: Number },
    ModifiedDate: { type: Date, default: Date.now },
    Comments: { type: String }
});
function constructModel() {
    model = mongodb_1.connection.model(collection, RequestStateLogSchema);
}
function createRequestStateLog(params) {
    if (!model) {
        constructModel();
    }
    var log = new model({
        RequestID: params._id,
        StateID: params.RequestState.StateID,
        ModifiedBy: params.RequestState.ModifiedBy,
        ModifiedDate: params.RequestState.ModifiedDate
    });
    log.save();
}
exports.default = {
    createRequestStateLog: createRequestStateLog
};
//# sourceMappingURL=RequestStateLog.js.map
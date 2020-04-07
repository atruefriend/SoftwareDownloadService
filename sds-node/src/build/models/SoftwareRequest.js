"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var mongodb_1 = require("../mongodb");
var RequestStateLog_1 = __importDefault(require("./RequestStateLog"));
var collection = "softwarerequests";
var model;
var softwareRequestSchema = new mongoose.Schema({
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
        Comments: { type: String },
    },
});
//Middleware function: it will always execute post saving, you can also use pre. Always register this before initializing model to work.
softwareRequestSchema.post("save", function (data) {
    RequestStateLog_1.default.createRequestStateLog(data);
});
function constructModel() {
    model = mongodb_1.connection.model(collection, softwareRequestSchema);
}
function createSoftwareRequest(params) {
    return __awaiter(this, void 0, void 0, function () {
        var newRequest;
        return __generator(this, function (_a) {
            if (!model) {
                constructModel();
            }
            newRequest = new model({
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
                    ModifiedBy: params.userId,
                },
            });
            newRequest.save();
            return [2 /*return*/];
        });
    });
}
function fetchSoftwareRequests(id, softwareName) {
    return __awaiter(this, void 0, void 0, function () {
        var query, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!model) {
                        constructModel();
                    }
                    if (id !== null && id !== undefined) {
                        query = model.findById(id);
                    }
                    else if (softwareName !== null && softwareName !== undefined) {
                        query = model.find({
                            SoftwareName: { $regex: ".*" + softwareName + ".*", $options: "i" },
                        });
                    }
                    else {
                        query = model.find({});
                    }
                    return [4 /*yield*/, query.sort({ CreatedOn: "desc" }).exec()];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response];
            }
        });
    });
}
function approveRequest(params) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!model) {
                constructModel();
            }
            model.findById(params.requestId, function (err, request) {
                if (!err) {
                    request.DownloadLocation = params.downloadLocation;
                    request.RequestState = {
                        StateID: params.stateId,
                        Comments: params.comments,
                        ModifiedBy: params.userId,
                    };
                    request.save();
                }
                else {
                    console.log("Error occurred : " + err);
                }
            });
            model.updateOne({ _id: params.requestId }, {
                DownloadLocation: params.downloadLocation,
                RequestState: {
                    StateID: params.stateId,
                    Comments: params.comments,
                    ModifiedBy: params.userId,
                },
            });
            return [2 /*return*/];
        });
    });
}
exports.default = {
    createSoftwareRequest: createSoftwareRequest,
    fetchSoftwareRequests: fetchSoftwareRequests,
    approveRequest: approveRequest,
};
//# sourceMappingURL=SoftwareRequest.js.map
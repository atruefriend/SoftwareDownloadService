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
var express_1 = __importDefault(require("express"));
var bodyParser = require("body-parser");
var db_1 = __importDefault(require("./db"));
var mongodb_1 = __importDefault(require("./mongodb"));
var sql = require("mssql");
var cors = require("cors");
var app = express_1.default();
var port = 8080;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.get("/", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongodb_1.default.getData("SoftwareRequests")];
                case 1:
                    data = _a.sent();
                    console.log("response: " + data);
                    res.send("Get request executed successfully!");
                    return [2 /*return*/];
            }
        });
    });
});
app.get("/getRequests", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var queryString, softwareName, requestId, params, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryString = req.query;
                    softwareName = queryString.softwareName;
                    requestId = queryString.requestId;
                    params = [];
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
                    return [4 /*yield*/, db_1.default.callStoredProcedure("GetRequets", params)];
                case 1:
                    data = _a.sent();
                    res.send(data);
                    return [2 /*return*/];
            }
        });
    });
});
app.post("/", function (req, res, next) {
    res.send("Post request executed successfully!");
});
app.post("/newRequest", function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var softwareName, tags, downloadUrl, version, reason, isFree, teamLead, userId, params, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    softwareName = req.body.softwareName;
                    tags = req.body.tags;
                    downloadUrl = req.body.downloadUrl;
                    version = req.body.version;
                    reason = req.body.reason;
                    isFree = req.body.isFree;
                    teamLead = req.body.teamLead;
                    userId = 1;
                    params = [
                        { name: "UserID", value: userId, type: sql.Int },
                        { name: "SoftwareName", value: softwareName, type: sql.VarChar(500) },
                        { name: "Tags", value: tags, type: sql.VarChar(500) },
                        { name: "DownloadUrl", value: downloadUrl, type: sql.VarChar(500) },
                        { name: "Version", value: version, type: sql.VarChar(200) },
                        { name: "Reason", value: reason, type: sql.VarChar(1000) },
                        { name: "FreePaid", value: isFree, type: sql.Int },
                        { name: "TeamLead", value: teamLead, type: sql.Int }
                    ];
                    return [4 /*yield*/, db_1.default.callStoredProcedure("AddRequest", params)];
                case 1:
                    result = _a.sent();
                    res.send("Request created successfully!");
                    return [2 /*return*/];
            }
        });
    });
});
app.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    return console.log("App is running successfully on port: " + port);
});
//# sourceMappingURL=app.js.map
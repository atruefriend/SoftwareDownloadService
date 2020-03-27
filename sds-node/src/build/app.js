"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express_1.default();
var port = 8080;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.get("/", function (req, res) {
    res.send("Get request executed successfully!");
});
app.post("/", function (req, res, next) {
    next();
    res.send("Post request executed successfully!");
});
app.post("/newRequest", function (req, res) {
    console.log(req.body.softwareName);
    res.send("Request created successfully!");
});
app.listen(port, function (err) {
    if (err) {
        return console.log(err);
    }
    return console.log("App is running successfully on port: " + port);
});

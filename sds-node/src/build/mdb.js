"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoClient = require("mongodb").MongoClient;
var connString = "mongodb+srv://dbNikhil:<password>@nik-nsfuu.mongodb.net/test?retryWrites=true&w=majority";
var dbName = "test";
function initialize(collectionName, onSuccess, onFailure) {
    MongoClient.connect(connString, function (err, dbInstance) {
        if (err) {
            console.log("[MongoDB connection] ERROR: ${err}");
            onFailure(err);
        }
        else {
            var dbObject = dbInstance.dbName(dbName);
            var dbCollection = dbObject.collection(collectionName);
            console.log("[MongoDB connection] SUCCESS");
            onSuccess(dbCollection);
        }
    });
}
function getData(collectionName) {
    initialize(collectionName, function (dbCollection) {
        dbCollection.find().toArray(function (err, result) {
            if (err)
                return err;
            return JSON.stringify(result);
        });
    }, function (err) {
        return err;
    });
}
exports.methods = {
    initialize: initialize,
    getData: getData
};
exports.default = exports.methods;
//# sourceMappingURL=mdb.js.map
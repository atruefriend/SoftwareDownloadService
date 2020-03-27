"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server = "http://localhost:8080/";
function PostData(method, data) {
    var endpoint = server + method;
    fetch(endpoint, {
        method: "Post",
        body: data
    }).then(function (res) {
        return res.json();
    });
}
exports.methods = {
    PostData: PostData
};
exports.default = exports.methods;

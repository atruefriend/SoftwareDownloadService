import express from "express";
const app = express();
const port = 8080;

app.get("/", function(req, res) {
  res.send("Get request executed successfully!");
});

app.listen(port, function(err) {
  if (err) {
    return console.log(err);
  }
  return console.log("App is running successfully on port: " + port);
});

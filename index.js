// implement your API here
//libraries
const express = require("express");
//Other files
const db = require("./data/db.js");
//Global objects
const server = express();

//Request handlers
//GET
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({
        err: "The users information could not be retrieved."
      });
    });
});

server.listen(3333, () => {
  console.log("Server is running on port 3333...");
});

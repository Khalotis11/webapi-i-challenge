// implement your API here
//libraries
const express = require("express");
//Other files
const db = require("./data/db.js");
//Global objects
const server = express();

//middleware
server.use(express.json());
//Request handlers:

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

//POST
server.post("/api/users", (req, res) => {
  const newHub = req.body;
  //validate the users
  db.insert(newHub)
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Please provide name and bio for the user."
      });
    });
});

server.listen(3333, () => {
  console.log("Server is running on port 3333...");
});

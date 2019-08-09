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
        err: err,
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
        err: err,
        errorMessage: "Please provide name and bio for the user."
      });
    });
});

//Delete
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.json(deletedUser);
      } else {
        res.status(404).json({
          message: "OOOOOPS, Invalid User Id"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: "The user with the specified ID does not exist."
      });
    });
});

/// GET USERS WITH SPECIFIED ID - api/users/:id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(users => {
      if (users) {
        res.json(users);
      } else {
        res.status(404).json({
          message: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        err: err,
        message: "Doesn't exist please try again later!"
      });
    });
});

//PUT
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updatedUser => {
      if (updatedUser) {
        res.json(updatedUser);
      } else if (!updatedUser.body.name || !updatedUser.body.bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." });
    });
});
server.listen(3333, () => {
  console.log("Server is running on port 3333...");
});

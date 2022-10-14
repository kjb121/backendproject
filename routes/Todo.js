const express = require("express");
const services = require('../services/render');
const userCont = require("../controllers/User");
const taskCont = require("../controllers/Task");
const router = express.Router();


//params
// it will fetch the value from the url
// router.param("tasks/:id", userCont.find);
// router.param("users/:id", userCont.find);


// to get all the tasks & Users
router.get("/tasks/", taskCont.find);
router.get("/users/", userCont.find);

// to get a single task & user
router.get("/tasks/:id/", taskCont.findOne);
router.get("/users/:id/", userCont.findOne);

// to create a task or a User
router.post("/tasks/", taskCont.create);
router.post("/users/", userCont.create);

// to update the task / user
router.put("/tasks/:id/", taskCont.update);
router.put("/users/:id/", userCont.update); 

// to delete the task or User
router.delete("/tasks/:id/", taskCont.delete);
router.delete("/users/:id/", userCont.delete);

// exporting the router to import it in index.js
module.exports = router;

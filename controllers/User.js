const { response } = require("express");
const User = require("../models/userSchema");
const Task = require("../models/Todo");

// ------------------ FIND method ------------------s

exports.find = (req, res) => {
  // User.find()
  // .then(user => {
  //     res.send(user)
  // })
  // .catch(err=>{
  //     res.status(500).send({ message: err.message || "Error occurred while retrieving user info"})
  // })
  const { where, select, sort } = req.query;

  User.find(eval("(" + where + ")"))
    .select(eval("(" + req.query.select + ")"))
    .sort(eval("(" + req.query.sort + " )"))
    .skip(eval("(" + req.query.skip + " )"))
    .limit(eval("(" + req.query.limit + " )"))
    // .sort(eval(req.query.sort))
    // .populate('tasks')
    .exec((error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json({ message: "success", Results: data.length, data });
      }
    });
};

// ................FInd one User...........

exports.findOne = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    if (data) {
      // console.log(User.name);
      res.status(200).json({ message: "ok", check: data.name, data });
    } else {
      res.status(404).send("No Records Found");
    }
  } catch (error) {
    res.status(404).send("No Records Found");
  }
};

// --------------------- CREATE and Post ------------------

// exports.create = (req, res) => {
//     // validate request
//     if (!req.body) {
//         res.status(400).send({ message: "content can not be empty" });
//         return;
//     }
//     console.log(req.body);
//     const user = new User(req.body);

//     // saving user in the database
//     user
//         .save(user)
//         .then(data => {
//             res.json({ message: "OK", data })
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Error occured in create operation"
//             });
//         });
// }

exports.create = async (req, res) => {
  if (!req.body.email == "" && !req.body.name == "") {
    const findEmail = await User.find({ email: req.body.email });
    console.log(findEmail);
    if (findEmail.length == 0) {
      try {
        const Upeople = new User(req.body);
        const data = await Upeople.save();
        res.status(201).json({ message: "Ok", data });
      } catch (error) {
        res.status(500).json({ message: "Server Error" });
      }
    } else {
      res.status(500).json({ message: "Email already exists" });
    }
  } else {
    res.status(500).json({ message: "Please enter email and name" });
  }
};

//update a new user by userid
exports.update = (req, res) => {
  console.log("req", req.body);
  if (!req.body) {
    return res.status(400).send({ message: "Data to update cannot be empty" });
  }
  const id = req.params.id;

  // if()

  User.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot update user --${id}` });
      } else {
        res.send(newData);
        // update Task Automatically

        if (req.body.pendingTasks !== "") {
          Task.findByIdAndUpdate(
            req.body.pendingTasks,
            { assignedUser: id, assignedUserName: data.name },
            { useFindAndModify: false }
          ).catch((err) => {
            res.status(500).send({ message: "Error Update user information" });
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

// delete a user with a specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot delete user --${id}` });
      } else {
        res.send({ message: "user deleted successfully" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Cannot delete user -- ${id}`,
      });
    });
};

// Task.findByIdAndUpdate(
//   req.body.taskId,
//   { assignedUser: id },
//   { useFindAndModify: false }
// )
//   .then((data) => {
//     if (!data) {
//       res.status(404).send({ message: `Cannot update user --${id}` });
//     } else {
//       res.send(data);
//     }
//   })
//   .catch((err) => {
//     res.status(500).send({ message: "Error Update user information" });
//   });

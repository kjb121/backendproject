const { response } = require('express');
const User = require('../models/userSchema');

// ------------------ FIND method ------------------s

exports.find = (req, res) => {

    // User.find()
    // .then(user => {
    //     res.send(user)
    // })
    // .catch(err=>{
    //     res.status(500).send({ message: err.message || "Error occurred while retrieving user info"})
    // }) 

    User.find(eval("(" + req.query.where + ")"))
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
                res.json({ message: "success", count: data.length, data });
            }
        });
}

// ................FInd one Task...........
exports.findOne = async(req, res) => {
    try{
        const data = await User.findById(req.params.id)
        if(data){
            res.status(200).json({message:"ok",data})
        }
        else{
            res.status(404).send("No Records Found")
        }
        
    }
    catch(error){
        res.status(404).send("No Records Found")
    }
    }


// --------------------- CREATE and Post ------------------


exports.create = (req, res) => {
    // validate request
    if (!req.body) {
        res.status(400).send({ message: "content can not be empty" });
        return;
    }
    console.log(req.body);
    const user = new User(req.body);

    // saving user in the database
    user
        .save(user)
        .then(data => {
            res.json({ message: "OK", data })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occured in create operation"
            });
        });
}


//update a new user by userid
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update cannot be empty" })
    }
    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot update user --${id}` })
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error Update user information" })
        })
}

// delete a user with a specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete user --${id}` })
            }
            else {
                res.send({ message: 'user deleted successfully' });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Cannot delete user -- ${id}`
            })
        })
}
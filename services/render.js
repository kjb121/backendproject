const axios = require('axios');
const { response } = require('express');


exports.homeRoutes = (req,res) => {
    //get req to fetch data
    axios.get("http://localhost:4000/api/users")
    .then(function(response){
        console.log(response);
        // res.render('index',{users : response.data});
    })
    .catch(err=>{
        res.send(err);
    })
    // res.render('index',{users : "New Data"}); 
}

exports.add_user = (req,res) => {
    res.render('add_user');
}


exports.update_user = (req,res) => {
    res.render('update_users');
}
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require('dotenv')


const todoRoutes = require("./routes/Todo");
const connectDB = require('./connection/connection');

const app = express();

dotenv.config({path : 'config.env'});
const PORT = process.env.PORT || 8080;

connectDB();



app.use(cors());
// middleware to convert our   request data into JSON format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));


app.use("/api", todoRoutes);

//No ROUTE 404 lINK

app.all('*', (req, res) => {
  res.status(404).send('Error 404! Page not found Try Different EndPoints');
});


// start the server in the port 4000
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});




// DB connection
// mongoose
//   .connect("mongodb://127.0.0.1:27017/todoapp", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => {
//     console.log("CONNECTED TO DATABASE");
//   });
require('dotenv').config(); // Config .env file

// Imports + use
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors({
  origin: process.env.URL,
  withCredentials : true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
app.use(cookieParser())



// Connecting to DB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Declaring first root+ routes
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);


//Declaring port+listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
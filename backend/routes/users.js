const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
require('dotenv').config(); 
let User = require('../models/users.model');


// Get all users
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error get all: ' + err));
});


// Register
router.route('/add').post(async (req, res) => {
  
  const {email, password, nickname} = req.body;

  try {
  //Check if inpust already exist
  const userByEmail = await User.findOne({ email });
  if (userByEmail)  return res.json("email")
  const userByNickname = await User.findOne({ nickname });
  if (userByNickname)  return res.json("nickname")

  //Hashing password
  const salt = await bcrypt.genSalt(10);
  if (!salt) throw Error('Something went wrong with bcrypt');
  const hash = await bcrypt.hash(password, salt);
  if (!hash) throw Error('Something went wrong hashing the password');

  //Saving user to DB
  const newUser = new User({
    email,
    password: hash,
    nickname  
  });
  const savedUser = await newUser.save();
  if (!savedUser) throw Error('Something went wrong saving the user');  

  //Create token
  const JWT_SECRET  = process.env.JWT_SECRET;
  const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {expiresIn: 3600});
 
  res.status(200).json({
    token,
    user: {
      id: savedUser.id,
      email: savedUser.email,
      password: savedUser.password,
      nickname: savedUser.nickname
    }
  });
  
}
  catch(e){
    res.status(400).json({ error: e.message });
  }



})


auth= (req, res, next) => {
  const token = req.query.token;
  // Check for token
  if (!token)
    return res.status(401).json({ msg: 'No token, authorizaton denied' });

  try {
    // Verify token
    const  JWT_SECRET= process.env.JWT_SECRET;
    const decoded = jwt.verify(token, JWT_SECRET);
    // Add user from payload
    req.user = JSON.stringify(decoded);
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};


// Get user details
router.route("/getUser").get( auth, async (req, res) => {
  

  id= JSON.parse(req.user).id;
  try {
      const user= await User.findOne({ _id: id });
      res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});


//Login
router.route("/login").post(async (req, res) => {

  const {email, password}= req.body;

  try{
     // Check for existing user
     const user = await User.findOne({ email });
     if (!user) return res.json("0");
     const isMatch = await bcrypt.compare(password, user.password);
     if (!isMatch) return res.json("0");
 
     //Check if token equals
     const JWT_SECRET  = process.env.JWT_SECRET;
     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
     if (!token) throw Error('Couldnt sign the token');

     res.cookie('token', token, { httpOnly: true }).status(200).json({token});


  }
  catch(e){
    res.status(400).json({ error: e.message });
  }









});









module.exports = router;
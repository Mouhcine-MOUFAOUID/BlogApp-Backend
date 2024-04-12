const User = require('../models/user.model');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const SECRET_KEY = process.env.SECRET_KEY



dotenv.config();

//Login function
async function toAuthenticate(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }
  const passOk = bcrypt.compareSync(password, user.password);
  if (passOk) {
    // User logged in
    jwt.sign({ name: user.name, id: user._id }, SECRET_KEY, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id: user._id,
        name: user.name
      });
    });
  } else {
    res.status(400).json({ message: 'Email or password incorrect' });
  }
}

function profile(req, res){
  try{
    const {token} = req.cookies;
  jwt.verify(token, SECRET_KEY, {}, (err, info)=>{
    if(err) throw err;
    res.json(info)
  })
  }catch(err){
    res.status(500).json({ err })
  }
}

function logout(req, res){
  res.cookie('token', '').json('Loging out..')
}

module.exports = { toAuthenticate, profile, logout };
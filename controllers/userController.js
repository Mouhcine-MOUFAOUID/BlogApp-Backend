const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const SALT = bcrypt.genSaltSync(10)
const SECRET_KEY = process.env.SECRET_KEY

// This function create Users
async function createUser(req, res) {
  const { email, name, password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }
    const user = new User({
      email,
      name,
      password: bcrypt.hashSync(password, SALT)
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('User creation error:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
}




// This one shows all the Users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error"});
  }
}

// This one show a user based on the id that we give
async function getUserById(req, res) {
  const id = req.params.id;
  try {
    const userId = await User.findOne({ _id: id });

    if (!userId) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(userId);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// This one update the user
async function updateUser(req, res) {
  const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, "mySecretCode200987**$");
    const role = decodedToken.role;
    if (role === 'admin') {
      const updatedUser = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        name: req.body.name,
      };
      User.updateOne({ _id: req.params.id }, updatedUser)
        .then(() => res.status(200).json({ message: 'User updated successfully!' }))
        .catch(() => res.status(404).json({ message: 'User not found' }));
    } else {
      res.status(403).json({ message: 'You are not an admin' });
    }
};

// this one delete the selected User
async function deleteUser(req, res) {
  try{
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, "mySecretCode200987**$");
  const role = decodedToken.role;
  if (role === 'admin') {
    //console.log(role);
  await User.deleteOne({_id: req.params.id});
  res.status(201).json({ message: 'User deleted successfully!' });        
  } else {
    res.status(400).json({ message: 'User not found' });
  }
  }catch (error) {
    res.status(403).json({ message: 'You are not an admin' });
  }};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};

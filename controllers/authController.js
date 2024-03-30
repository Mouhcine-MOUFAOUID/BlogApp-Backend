const User = require('../models/user.model');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


const generateToken = (email, _id, role) => {
  const token = jwt.sign({ user : email, _id, role }, "mySecretCode200987**$", { expiresIn: "2h" });
  return token;
};

dotenv.config();

async function toAuthenticate(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Email not exist" });
    }
    if (user.password !== password || user.email !== email) {
      return res.status(401).json({ message: "Email or Password incorrect" });
    }

    const token = generateToken(user.email, user._id, user.role);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Authentication Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { toAuthenticate };
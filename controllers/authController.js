// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, username, password, role, pickupAddress } = req.body;
  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      email,
      username, 
      password: hashedPassword, 
      role 
    });
    if (role === 'Manufacturer') {
      newUser.pickupAddress = pickupAddress;
    }
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { password } = req.body;
  console.log(req.body.email);

  try {
    const user = await User.findOne({ email: req.body.email});
    console.log(user)
    const role = user.role;
    const email = user.email;

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'Ravindrasinghrathore27072001', { expiresIn: '1h' });
    res.json({ token, role, email });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

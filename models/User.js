// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Manufacturer', 'Transporter'], required: true },
  pickupAddress: { type: String },
});

module.exports = mongoose.model('User', userSchema);

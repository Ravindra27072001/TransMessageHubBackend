// models/Message.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderHistory = new Schema({
  sender: String,
  content: String,
  // Add other fields as needed
});

module.exports = mongoose.model('OrdersHistory', OrderHistory);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({

  orderID: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  quantity: { type: Number, required: true },
  pickupAddress: { type: String, required: true },
  transporter: { type: String, required: true },
  price: { type: String, required: true },
  manufacturer: {type: String, require: true},

});

module.exports = mongoose.model('Message', messageSchema);

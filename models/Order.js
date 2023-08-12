const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

  orderID: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  quantity: { type: Number, required: true },
  pickupAddress: { type: String, required: true },
  transporter: { type: String, required: true },
  manufacturer: {type: String, required: true },
  
});

module.exports = mongoose.model('Order', orderSchema);

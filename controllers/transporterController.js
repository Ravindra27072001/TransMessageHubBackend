// controllers/transporterController.js
const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  try {
    console.log("email",req.params['email']);
    const orders = await Order.find({transporter: req.params['email']});
    console.log("Orders",orders)
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order IDs' });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    console.log("email",req.params['orderId']);

    const orders = await Order.deleteOne({orderID: req.params['orderId']});

    console.log("Orders",orders)
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order IDs' });
  }
};
exports.replyToOrder = async (req, res) => {
  const { orderId, price } = req.body;

  try {
    // Handle sending reply message to Manufacturer here
    // Create a new message or update an existing one with the reply details

    res.status(201).json({ message: 'Reply sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error replying to order' });
  }
};

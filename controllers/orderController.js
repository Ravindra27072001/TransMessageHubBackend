// controllers/orderController.js
const Order = require('../models/Order');

// exports.getOrderIds = async (req, res) => {
//   try {
//     const orderIds = await Order.distinct('orderId');
//     console.log(orderIds);
//     res.status(200).json(orderIds);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching order IDs' });
//   }
// };

exports.getOrders = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log("ejhfdhsdhfsgdvhfsdfds")
    const getOrders = await Order.find({manufacturer: req.params['email']});
    console.log(getOrders);
    res.status(200).json(getOrders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order IDs' });
  }
};

exports.getOrdersByOrderId = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log("ejhfdhsdhfsgdvhfsdfds")
    const getOrders = await Order.find({orderID: req.params['orderId']});
    console.log(getOrders);
    res.status(200).json(getOrders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order IDs' });
  }
};

exports.sendOrdersToTransporter = async (req, res) => {
  try {
      const { orderID, from, to, quantity, pickupAddress, transporter, manufacturer } = req.body;
      console.log(req.body)
      const newMessage = new Order({
          orderID,
          from,
          to,
          quantity,
          pickupAddress,
          transporter,
          manufacturer,
      });
      const savedMessage = await newMessage.save();
      res.status(201).json(savedMessage);
  } catch (error) {
      res.status(400).json({ error: 'Message creation failed' });
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

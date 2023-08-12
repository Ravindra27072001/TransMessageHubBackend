const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  try {
    const getOrders = await Order.find({ manufacturer: req.params['email'] });
    console.log(getOrders);
    res.status(200).json(getOrders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order IDs' });
  }
};

exports.sendOrdersToTransporter = async (req, res) => {
  try {
    const { orderID, from, to, quantity, pickupAddress, transporter, manufacturer } = req.body;
    // console.log(req.body)
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

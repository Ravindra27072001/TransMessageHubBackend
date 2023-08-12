// controllers/manufacturerController.js
const Message = require('../models/Message');
const User = require('../models/User')

exports.getMessages = async (req, res) => {
  try {
    console.log("ddddsdsds")
    let messages = await Message.find();
    console.log(messages)

    if (req.query.search) {
      const searchQuery = req.query.search;
      messages = await Message.find({
        $or: [
          { orderId: searchQuery },
          { from: searchQuery },
          { to: searchQuery }
        ]
      });
    }

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

exports.getTransporters = async (req, res) => {
  try {
    console.log("ddddsdsds")
    let messages = await User.find();
    console.log("Messages",messages)

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

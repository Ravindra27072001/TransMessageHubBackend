const User = require('../models/User')

exports.getTransporters = async (req, res) => {
  try {
    let messages = await User.find();
    // console.log("Messages",messages)

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching messages' });
  }
};

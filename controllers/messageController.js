const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const {orderID,from, to, quantity, pickupAddress, price, transporter, manufacturer} = req.body.receivedReply;
        // console.log("req.body", req.body);
        const newReply = new Message({
            orderID: orderID,
            from: from,
            to: to,
            quantity: quantity,
            pickupAddress: pickupAddress,
            transporter: transporter,
            price: price,
            manufacturer: manufacturer,
        });
        await newReply.save();

    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
};

exports.getreplies = async (req, res) => {
    try {
        // console.log("req",req.params['email']);
        const replies = await Message.find({manufacturer: req.params['email']});
        return res.status(200).json(replies);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
};
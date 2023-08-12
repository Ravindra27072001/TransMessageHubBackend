// controllers/messageController.js
const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try {
        const {orderID,from, to, quantity, pickupAddress, price, transporter, manufacturer} = req.body.receivedReply;
        console.log("req.body", req.body);
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
        console.log("reqqqqqqqqqq",req.params['email']);
        // const {orderID,from, to, quantity, pickupAddress, price, transporter} = req.body.receivedReply;
        const replies = await Message.find({manufacturer: req.params['email']});
        console.log("replies",replies)
        return res.status(200).json(replies);

    } catch (error) {
        res.status(500).json({ error: 'Error fetching messages' });
    }
};

exports.getMessageById = async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching message' });
    }
};

exports.updateMessage = async (req, res) => {
    try {
        const updatedMessage = await Message.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ error: 'Error updating message' });
    }
};

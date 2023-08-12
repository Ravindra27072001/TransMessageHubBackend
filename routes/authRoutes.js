// routes/api.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');
const orderController = require('../controllers/orderController');
const manufacturerController = require('../controllers/manufacturerController')
const transporterController = require('../controllers/transporterController');

// Authentication Routes
router.post('/api/register', authController.register);
router.post('/api/login', authController.login);


router.get('/api/transporters', manufacturerController.getTransporters);

// Message Routes
router.post('/api/sendOrdersToTransporter', orderController.sendOrdersToTransporter);

router.post('/api/receivedReply', messageController.getMessages);
router.get('/api/showReplies/:email', messageController.getreplies);
// router.put('/api/messages/:id', messageController.updateMessage);

// Order Routes
router.get('/api/orders/:email', transporterController.getOrders);
router.get('/api/getOrders/:email', orderController.getOrders);
router.get('/api/getOrders/:orderId', orderController.getOrdersByOrderId);
router.delete('/api/deleteOrders/:orderId', transporterController.deleteOrder);
router.post('/api/reply', orderController.replyToOrder);

module.exports = router;

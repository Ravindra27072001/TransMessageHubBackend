const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');
const orderController = require('../controllers/orderController');
const manufacturerController = require('../controllers/manufacturerController')
const transporterController = require('../controllers/transporterController');

router.post('/api/register', authController.register);

router.post('/api/login', authController.login);

router.get('/api/transporters', manufacturerController.getTransporters);

router.post('/api/sendOrdersToTransporter', orderController.sendOrdersToTransporter);

router.post('/api/receivedReply', messageController.getMessages);

router.get('/api/showReplies/:email', messageController.getreplies);

router.get('/api/orders/:email', transporterController.getOrders);

router.get('/api/getOrders/:email', orderController.getOrders);

router.delete('/api/deleteOrders/:orderId', transporterController.deleteOrder);

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const OrdersHistory = require('./models/OrderHistory');
const OrderHistory = require('./models/OrderHistory');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);

mongoose.connect('mongodb://0.0.0.0:27017/chatApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

const server = http.createServer(app);


const io = socketIo(server, {
    cors: {
        origin: 'http://localhost:5000', // Replace with your frontend's origin
        // methods: ['GET', 'POST'],
    },
});

const manufacturerSockets = new Map();

io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinManufacturer', (email) => {
        manufacturerSockets.set(email, socket.id);
    });

    socket.on('sendReply', (data) => {
        // const {orderId, from, to, manufacturer, pickupAddress, price, transporter } = data;
        console.log("data", data);
        const manufacturerSocketId = manufacturerSockets.get(data.manufacturer);
        

        if (manufacturerSocketId) {
            io.to(manufacturerSocketId).emit('receiveReply',data);
        }
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });
});

// app.get('/', (req, res) => res.send('API is running'));

app.post('/api/messages', async (req, res) => {
    try {
      const { sender, content } = req.body;
      const ordersHistory = new OrdersHistory({ sender, content });
      console.log(ordersHistory)
      await ordersHistory.save();
      res.status(201).send(ordersHistory);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  // Get all messages
  app.get('/api/messages', async (req, res) => {
    try {
      const ordersHistory = await OrdersHistory.find();
      console.log(ordersHistory);
      res.status(200).send(ordersHistory);
    } catch (error) {
      res.status(500).send(error);
    }
  });

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

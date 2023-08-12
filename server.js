require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const OrdersHistory = require('./models/OrderHistory');

const app = express();
// const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);

app.use(express.static(path.join(__dirname, './build')));

const {NODE_ENV, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD} = process.env
// console.log(process.env)
console.log(NODE_ENV,DB_USER,DB_HOST,DB_NAME,DB_PASSWORD)
const connectionStr = NODE_ENV === 'development' ? `mongodb://0.0.0.0:27017/chatApp` : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`
// mongodb+srv://TransMessageHub:<password>@cluster0.wxaftsp.mongodb.net/?retryWrites=true&w=majority
console.log(connectionStr);
mongoose.connect(connectionStr)

mongoose.connection.on('error', error => {
    console.error(`could not connect to database, error = `, error.message)
    process.exit(1);
})

mongoose.connection.on('open', function () {
    console.error(`successfully connected to database`)
    // console.log(process.env);
})

app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// mongoose.connect('mongodb://0.0.0.0:27017/chatApp', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log('Error connecting to MongoDB:', err));

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
const port = process.env.PORT;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

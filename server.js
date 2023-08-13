require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/authRoutes');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(authRoutes);


const { NODE_ENV, DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env

console.log(NODE_ENV, DB_USER, DB_HOST, DB_NAME, DB_PASSWORD)

const connectionStr = NODE_ENV === 'development' ? `mongodb://0.0.0.0:27017/chatApp` : `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/?retryWrites=true&w=majority`
// mongodb+srv://TransMessageHub:<password>@cluster0.wxaftsp.mongodb.net/?retryWrites=true&w=majority
// console.log(connectionStr);

mongoose.connect(connectionStr)

mongoose.connection.on('error', error => {
  console.error(`could not connect to database, error = `, error.message)
  process.exit(1);
})

mongoose.connection.on('open', function () {
  console.error(`successfully connected to database`)
})

// mongoose.connect('mongodb://0.0.0.0:27017/chatApp', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log('Error connecting to MongoDB:', err));

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5000',
  },
});

const manufacturerSockets = new Map();

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('joinManufacturer', (email) => {
    manufacturerSockets.set(email, socket.id);
  });

  socket.on('joinTransporter', (email) => {
    manufacturerSockets.set(email, socket.id);
  });

  socket.on('sendReplyToManufacturer', (data) => {
    // console.log("data", data);
    const manufacturerSocketId = manufacturerSockets.get(data.manufacturer);
    console.log("manufacturerSocketId", manufacturerSocketId);

    if (manufacturerSocketId) {
      io.to(manufacturerSocketId).emit('receiveReplyFromTransporter', data);
    }
  });

  socket.on('sendOrderToTransporter', (data) => {
    console.log("data", data);
    const transporterSocketId = manufacturerSockets.get(data.transporter);
    console.log("transporterSocketId", transporterSocketId);

    if (transporterSocketId) {
      io.to(transporterSocketId).emit('receiveReplyFromManufacturer', data);
    }
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

// app.get('/', (req, res) => res.send('API is running'));

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

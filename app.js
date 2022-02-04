const express  = require('express');
const http     = require('http');
const mongoose = require('mongoose');
const router   = require('./routes/web.js');
const socket   = require('socket.io');
const cors     = require('cors');
const io       = require('socket.io')();
require('./socket')(io)

const app      = express();
const server   = http.createServer(app);

app.use("/", router);
app.use(cors());

mongoose.connect('mongodb+srv://Dhruv:Hello123@chat.qqu3d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

server.listen(3000, () => {
    console.log("Server is Running at port 3000");
});

io.attach(server);

module.exports = { io }; 

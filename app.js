const express  = require('express');
const router   = require('./routes/web.js');
const mongoose = require('mongoose');
var cors = require('cors');

const app = express();
app.use("/", router);
app.use(cors());

mongoose.connect('mongodb+srv://Dhruv:Hello123@chat.qqu3d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.listen(3000, () => {
    console.log("Server is Running at port 3000");
});
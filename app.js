const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());
const apirouter = require('./routers/router');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/sanjay').then(() => {
    console.log("Database is connected to sanjay");
})
.catch((error) => {
    console.log(`error in data base ${error}`);
});





app.use(express.static('public'))


app.use(express.json());
app.use(apirouter);
app.use(express.urlencoded({extended:false}))


const port = process.env.PORT;



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
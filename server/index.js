const express = require('express');
const cors = require('cors');
const DiaryRoute = require('./Routes/DairyRoute');
const ImageRoute = require('./Routes/ImageRoute');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;

const app = express();

app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

app.use(cors());
dotenv.config();

mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        app.listen(process.env.PORT || 5000);
        console.log('connect to db');
    })
    .catch ((err) => {
        console.log(err.message);
    }); 

app.use('/api/upload', ImageRoute);
app.use('/api/diaries', DiaryRoute); 

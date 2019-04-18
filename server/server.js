const express = require('express');
const app = express();
const cors = require('cors');
const AWS = require('aws-sdk');
const randomDescription = require('./random_text.js');
const db = require('../database/db.js');
require('dotenv').config()

// AWS.config.update({
//     accessKeyId: process.env.S3Access,
//     secretAccessKey: process.env.S3Secret,
//     region: 'us-east-2'
// });

// const s3 = new AWS.S3();

app.use(express.json({urlencoded: true}));
app.use(cors());
app.use(express.static('dist'))

const params = {
    Bucket: 'axes'
}


app.get('/api/carousel/products', (req, res) => {
    db.getAll((err, data) => {
        if (err) {
            console.log(err);
            res.end()
        } else {
            res.send(data);
        }
    })
});

app.post('/seed', (req, res) => {
    
})

app.listen(process.env.PORT || 3010, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log('we in dis');
    }
});
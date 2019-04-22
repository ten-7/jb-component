const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const db = require('../database/db.js');
const ObjectsToCsv = require('objects-to-csv');
require('dotenv').config();

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
    db.save({
        productId: 100,
        name: 'Soul Flare',
        images:`https://s3.us-east-2.amazonaws.com/axes/battle+axe/1.+battle-axe.jpg`,
        price: 499,
        description: 'Palo santo mixtape occaecat sartorial. Cloud bread YOLO swag',
        tag: 'throwing'
    }, (error) => {
        if (error) {
            console.error(error);
        } else {
            console.log("Success!");
        }
        res.end()
    });
})

const port = process.env.PORT || 3000;
app.listen(port, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`connection at port ${port}`);
    }
});
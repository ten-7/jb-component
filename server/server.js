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
    const stream = fs.createReadStream('./outputpg.csv');

    res.end();
})

const port = process.env.PORT || 3000;
app.listen(port, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`connection at port ${port}`);
    }
});
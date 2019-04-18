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
    // for(let i = 0; i < 10; i++) {
    //     const newInserts = [];
    //     for(let i = 0; i < 10000; i++) {
    //         const insert = {
    //             productId: 1,
    //             name: "Early Retirement",
    //             images: [`https://s3.us-east-2.amazonaws.com/axes/battle+axe/1.+battle-axe.jpg`],
    //             price: 2009,
    //             description: "Your retirement has come early, but it's not coming with a pension",
    //             tag: 'battle'
    //         }
    //         newInserts.push(insert);
    //     }
    //     db.save(newInserts);
    // }

    db.save({productId: 1,
        name: "Early Retirement",
        images: [`https://s3.us-east-2.amazonaws.com/axes/battle+axe/1.+battle-axe.jpg`],
        price: 2009,
        description: "Your retirement has come early, but it's not coming with a pension",
        tag: 'battle'}, (err) => {
            if (err) {
                console.error(err);
                res.end();
            } else {
                res.send("success")
            }
        })
    
})

const port = process.env.PORT || 3000;
app.listen(port, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`connection at port ${port}`);
    }
});
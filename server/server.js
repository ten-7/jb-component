const express = require('express');
const app = express();
const cors = require('cors');
const AWS = require('aws-sdk');
const randomDescription = require('./random_text.js');
const db = require('../database/db.js');

AWS.config.update({
    accessKeyId: process.env.S3Access,
    secretAccessKey: process.env.S3Secret,
    region: 'us-east-2'
});


const s3 = new AWS.S3();




app.use(express.json({urlencoded: true}));
app.use(cors());
app.use(express.static('dist'))

const params = {
    Bucket: 'axes'
}

app.get('/api', (req, res) => {

    res.send({objectId: 1});
});


app.get('/api/products', (req, res) => {
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
    s3.listObjects(params, function (err, data) {
        if(err) {
            throw err;
        } else {
            const urlArr = [];
            for (let i = 0; i < data.Contents.length; i++) {
                let path = data.Contents[i].Key//.replace(' ','+');
                urlArr.push('https://s3.us-east-2.amazonaws.com/axes/'+path)
            }
            const tags = ['battle','war','fireman','hatchet','lumber','halberd','boarding','throwing']

            const randomData = randomDescription.randomData.filter(value => {
                return value !== '';
            })

            for (let j = 0; j < randomDescription.randomNames.length; j++) {
                const img1 = Math.floor(Math.random()*(urlArr.length))
                const img2 = Math.floor(Math.random()*(urlArr.length))
                const img3 = Math.floor(Math.random()*(urlArr.length))
                const tagIndex = Math.floor(Math.random()*(tags.length))

                const productPrice = Math.floor(Math.random()*2000) + 500
                const productImages = [urlArr[img1], urlArr[img2], urlArr[img3]];
                const productName = randomDescription.randomNames[j];
                const productDescription = randomData[j];
                const productTag = tags[tagIndex]
                const productId = j+1
                
                db.save(productId, productName, productImages, productDescription, productPrice, productTag)
            }
        }

        res.end();
    });
})



app.listen(process.env.PORT || 3010, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log('we in dis');
    }
});
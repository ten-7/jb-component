const mongoose = require('mongoose');
require('dotenv').config()
// const url = process.env.MONGO_URI;
mongoose.connect('mongodb://localhost:27017/sdc',{useNewUrlParser: true} , (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('we made it')
  }
});

let productSchema = mongoose.Schema({
  productId: Number,
  name: String,
  images: Array,
  price: Number,
  description: String,
  tag: String
});

let Product = mongoose.model('Product', productSchema);

let save = (newInserts, callback) => {
  // for (i = 0; i < newInserts.length; i++) {

  // }
  const newProduct = new Product(newInserts);
  newProduct.save((err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
}

let getAll = (callback) => {
  Product.find({},['productId','name','images','price','description','tag'],
  {
    skip: 0,
    // limit: 25,
    sort: {
      _id: -1
    }
  }, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null,data);
    }
  });
}

module.exports.save = save;

module.exports.getAll = getAll;





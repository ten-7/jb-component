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

let save = (newInserts) => {
  let newThing  = new Product({
      productId: productId,
      name: productName,
      images: productImages,
      price: productPrice,
      description: productDescription,
      tag: productTag
  })
   
  newThing.save((err, success) => {
    if (err) {
      console.log('err')
    } else {
      console.log('success');
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





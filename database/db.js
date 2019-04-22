const mongoose = require('mongoose');
// require('dotenv').config()
// const url = process.env.MONGO_URI;
mongoose.connect('mongodb://localhost:27017/sdc',{useNewUrlParser: true} , (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('we made it')
  }
});

const productSchema = mongoose.Schema({
  productId: Number,
  name: String,
  images: Array,
  price: Number,
  description: String,
  tag: String
});

const Product = mongoose.model('Product', productSchema);

const save = (newInsert, callback) => {
  Product.save(newInsert, (err, res) => {
    if (error) {
      callback(err)
    } else {
      callback(null, "success");
    }
  })
}



const getAll = (callback) => {
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

module.exports = { save, getAll };
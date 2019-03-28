const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/axe-center');

let productSchema = mongoose.Schema({
  productId: Number,
  name: String,
  images: Array,
  price: Number,
  description: String,
  tag: String
});

let Product = mongoose.model('Product', productSchema);

let save = (productId,productName, productImages, productDescription, productPrice, productTag) => {
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





const db = require('./db.js');

const saver = (newInserts, callback) => {
  const bulk = db.Product.initializeUnorderedBulkOp();
  for (i = 0; i < newInserts.length; i++) {
    bulk.insert(newInserts[i]);
  }
  callback(bulk.execute());
  // db.Product.insertMany(newInserts, (err, res) => {
  //   if (err) callback (err)
  //   else callback(null, res);
  // });
}

// console.log(new Date());
for(let i = 0; i < 10; i++) {
  const newInserts = [];
  for(let i = 0; i < 1000000; i++) {
    const insert = {
      productId: 1,
      name: "Early Retirement",
      images: [`https://s3.us-east-2.amazonaws.com/axes/battle+axe/1.+battle-axe.jpg`],
      price: 2009,
      description: "Your retirement has come early, but it's not coming with a pension",
      tag: 'battle'
    }
    newInserts.push(insert);
  }
  saver(newInserts, (err, res) => {
    if (err) console.error(err)
    else console.log("success");
  })
}
// console.log(new Date());
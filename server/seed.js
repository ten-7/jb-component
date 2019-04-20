const fs = require('file-system');

for(let i = 0; i < 1; i++) {
  const creater = fs.createWriteStream('./data.csv')
  for(let j = 0; j < 10000000; j++) {
    if (j % 1000000 === 0) {
      console.log("mil");
    }
    const obj = {
      productId: 1,
      name: 'Early Retirement',
      images: [`https://s3.us-east-2.amazonaws.com/axes/battle+axe/1.+battle-axe.jpg`],
      price: 2009,
      description: 'Your retirement has come early, but it\'s not coming with a pension',
      tag: 'battle'
    }
    creater.write(JSON.stringify(obj));
  }
}
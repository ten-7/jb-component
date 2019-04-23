const ObjectsToCsv = require('objects-to-csv');

const makeCsv = async function () {
  const csv = new ObjectsToCsv(array);
  await csv.toDisk('./data.csv').concat()
}
const array = [];
setInterval(() => {
  for(let j = 0; j < 1000000; j++) {
    if (j % 100000 === 0) {
      console.log(j/100000);
    }
    const obj = {
      productId: 1,
      name: 'Early Retirement',
      images: [`https://s3.us-east-2.amazonaws.com/axes/battle+axe/1.+battle-axe.jpg`],
      price: 2009,
      description: 'Your retirement has come early, but it\'s not coming with a pension',
      tag: 'battle'
    }
    array.push(obj);
  }
  makeCsv();
}, 60000);

//node --max-old-space-size=6144 /home/jonathan/Documents/Repos/jb-component/server/seed.js
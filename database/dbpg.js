const db = require('./pgconfig.js')

const getAll = (cb) => {
  db.pool.query("SELECT * FROM products ORDER BY _id DESC LIMIT 50", (err, data) => {
    if (err) {
      console.log('db pg getAll error')
    } else {
      console.log('db pg getAll success')
      cb(null, data.rows)
    }
  })
}

module.exports = {getAll};
const pg = require('pg');
require('dotenv').config()

const config = {
  user: 'jonathan',
  database: 'test_db', 
  password: process.env.postgresPW,
  host: process.env.PGHOST,
  port: 5432, 
  max: 5000, // max number of connection can be open to database
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

const pool = new pg.Pool(config);

pool.connect((err, success) => {
  if (err) {
    console.log('db pg connect error:', err);
  } else {
    console.log('db pg connect success')
  }
})

module.exports = {pool}
const { Pool } = require('pg');
require('dotenv').config();

module.exports.getClient = async () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: process.env.POSTGRESQLPWD,
    database: 'filtershine',
    ssl: false
  });

  await pool.connect().then(client => {
    client.release();
    console.log('Released client');
  }).catch(err => console.log(err));
  console.log('Connected to PSQL database...');

  return pool;
};



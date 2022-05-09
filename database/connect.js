const { Pool } = require('pg');

module.exports.getClient = async () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '123',
    database: 'filtershine',
    ssl: false
  });

  await pool.connect().catch(err => console.log(err));
  console.log('Connected to PSQL database...');

  return pool;
};



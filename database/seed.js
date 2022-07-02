const { getClient } = require('./connect.js');

// (async () => {
//   const pool = await getClient();

//   await pool.query('CREATE DATABASE filtershine IF NOT EXISTS;')
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

//   await pool.end();
// })();

(async () => {
  const pool = await getClient();

  let createTableQuery =
  `CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY, route VARCHAR, city_location VARCHAR, company VARCHAR, location VARCHAR, address VARCHAR, city VARCHAR, st VARCHAR, zip VARCHAR, phone_number VARCHAR, contact VARCHAR, title VARCHAR, poc_number VARCHAR, email VARCHAR, serviceOn DATE, cycle INT
  );`;

  await pool.query(createTableQuery)
    .then((data) => {console.log(data)})
    .catch((err) => {console.log(err)});

  let inventoryPath = '/home/toekneedeez/hackreactor/client.csv';
  let copyInventoryCSV = `COPY clients FROM '${inventoryPath}' WITH DELIMITER ',' CSV header;`;

  await pool.query(copyInventoryCSV)
    .then(data => {console.log('Successful copy from client.csv...', data)})
    .catch(err => {console.log('Unsuccessful copy from client.csv...', err)});

  await pool.end();
})();

(async () => {
  const pool = await getClient();

  let createTableQuery =
  `CREATE TABLE IF NOT EXISTS filters (
      id SERIAL PRIMARY KEY, type VARCHAR, stock INT
    );`;

  await pool.query(createTableQuery)
    .then((data) => {console.log(data)})
    .catch((err) => {console.log(err)});

  let inventoryPath = '/home/toekneedeez/hackreactor/filterInventory.csv';
  let copyInventoryCSV = `COPY filters FROM '${inventoryPath}' WITH DELIMITER ',' CSV header;`;

  await pool.query(copyInventoryCSV)
    .then(data => {console.log('Successful copy from filters.csv...', data)})
    .catch(err => {console.log('Unsuccessful copy from filters.csv...', err)});

  await pool.end();
})();

(async () => {
  const pool = await getClient();
  let testSchema = 'id SERIAL PRIMARY KEY, client_id INT, filter_id INT, installed INT';
  let createTableQuery = `
    CREATE TABLE IF NOT EXISTS filters_installed (
      ${testSchema}
    );`;

  await pool.query(createTableQuery)
    .then((data) => {console.log(data)})
    .catch((err) => {console.log(err)});

  let inventoryPath = '/home/toekneedeez/hackreactor/filter_used.csv';
  let copyInventoryCSV = `COPY filters_installed FROM '${inventoryPath}' WITH DELIMITER ',' CSV header`;

  await pool.query(copyInventoryCSV)
    .then(data => {console.log('Successful copy from filter_used.csv...', data)})
    .catch(err => {console.log('Unsuccessful copy from filter_used.csv...', err)});

  await pool.end();
})();

const { getClient } = require('./connect.js');

(async () => {
  const pool = await getClient();
  // let schema = 'id INT PRIMARY KEY, type VARCHAR, stock INT, available INT, installed INT, price VARCHAR';
  let testSchema = 'Weekday VARCHAR Route VARCHAR(255) City/Location VARCHAR Company VARCHAR Location VARCHAR Address VARCHAR City VARCHAR ST VARCHAR Zip VARCHAR Phone VARCHAR Contact VARCHAR Title VARCHAR Phone VARCHAR Email VARCHAR Start Date VARCHAR Interval INT';
  let createTableQuery = `
    CREATE TABLE IF NOT EXISTS filter_inventory (
      ${testSchema}
    );`;

  await pool.query(createTableQuery)
    .then((data) => {console.log(data)})
    .catch((err) => {console.log(err)});

  let inventoryPath = '/home/toekneedeez/hackreactor/client.csv';
  let copyInventoryCSV = `COPY filter_inventory FROM '${inventoryPath}' WITH DELIMITER ',' CSV header`;

  await pool.query(copyInventoryCSV)
    .then(data => {console.log('Successful copy from client.csv...', data)})
    .catch(err => {console.log('Unsuccessful copy from client.csv...', err)});
})();

// let testSchema = 'Weekday VARCHAR Route VARCHAR City/Location VARCHAR Company VARCHAR Location VARCHAR Address VARCHAR City VARCHAR ST VARCHAR Zip VARCHAR Phone VARCHAR Contact VARCHAR Title VARCHAR Phone VARCHAR Email VARCHAR Start Date VARCHAR Interval INT';

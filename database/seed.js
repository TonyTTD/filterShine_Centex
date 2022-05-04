const { getClient } = require('./connect.js');

(async () => {
  const pool = await getClient();
  let schema = 'id INT PRIMARY KEY, type VARCHAR, stock INT, available INT, installed INT, price VARCHAR';
  let createTableQuery = `
    CREATE TABLE IF NOT EXISTS filter_inventory (
      ${schema}
    );`;

  await pool.query(createTableQuery)
    .then((data) => {console.log(data)})
    .catch((err) => {console.log(err)});

  // let inventoryPath = '/home/toekneedeez/hackreactor/filterInventory.csv';
  // let copyInventoryCSV = `COPY filter_inventory FROM '${inventoryPath}' WITH DELIMITER ',' CSV header`;

  // await pool.query(copyInventoryCSV)
  //   .then(data => {console.log('Successful copy from filterInventory.csv...', data)})
  //   .catch(err => {console.log('Unsuccessful copy from filterInventory.csv...', err)});
})();
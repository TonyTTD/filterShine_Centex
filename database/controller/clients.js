const { getClient } = require('../connect.js');

// Controller functions that affect the clients table
module.exports = {
  getClientsDB: async (to, from) => {
    try {
      let pool = await getClient();
      let queryDB = `
      SELECT *
      FROM clients
      JOIN
      (
        SELECT filters.client_id, json_object_agg(filters.filter_id, json_build_object('type', filters.type, 'installed', filters.installed)) AS filter_id
        FROM
          (
          SELECT *
          FROM filters_installed
          JOIN filters
          ON filters_installed.filter_id = filters.id
          ) AS filters
        GROUP BY filters.client_id
      ) AS serviceLog
      ON clients.id = serviceLog.client_id`;

      let clients = await pool.query(queryDB);
      return clients.rows;
    }
    catch (err) {
      throw err;
    }
  },
  addClient: async (clientInfo) => {
    try {
      let pool = await getClient();

      const {newClientInfo, filterList} = clientInfo;

      let queryDBClient =
      `INSERT INTO clients (route, city_location, company, location, address, city, st, zip, phone_number, contact, title, poc_number, email, serviceon, cycle, createdon) VALUES ('${newClientInfo.route}', '${newClientInfo.city_location}', '${newClientInfo.company}', '${newClientInfo.location}', '${newClientInfo.address}', '${newClientInfo.city}', '${newClientInfo.st}', '${newClientInfo.zip}', '${newClientInfo.phone_number}', '${newClientInfo.contact}', '${newClientInfo.title}', '${newClientInfo.poc_number}', '${newClientInfo.email}', '${newClientInfo.serviceon}', '${newClientInfo.cycle}', '${newClientInfo.createdon}');
      `;

      await pool.query(queryDBClient);

      let clientId = await pool.query(`SELECT max(clients.id) FROM clients`);

      for (let i = 0; i < filterList.length; i++) {
        await pool.query(`INSERT INTO filters_installed (client_id, filter_id, installed) VALUES ('${clientId.rows[0].max}', '${filterList[i][0]}', '${filterList[i][2]}');`);
      }

    }
    catch (err) {
      throw err;
    }
  },
  updateServiceDate: async (newDate, id) => {
    try {
      let pool = await getClient();
      let queryDB = `
        UPDATE clients
        SET serviceon = '${newDate}'
        WHERE clients.id = ${id}
        RETURNING *;
      `;

      let updatedServiceDate = await pool.query(queryDB);
      return updatedServiceDate;
    }
    catch (err) {
      throw err;
    }
  },
  updateServiceCycle: async (cycle, id) => {
    try {
      let pool = await getClient();
      let queryDB = `
        UPDATE clients
        SET cycle = ${cycle}
        WHERE clients.id = ${id}
        RETURNING *;
      `;

      let updatedCycle = await pool.query(queryDB);
      return updatedCycle;
    }
    catch (err) {
      throw err;
    }
  },
};

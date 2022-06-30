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
    } catch (err) {
      throw err;
    }
  },
  addClient: async () => {
    let pool = await getClient();
    // let queryDB = `INSERT INTO clients;`; //Update this section when we have defined a client-side API route
  },

};

const { getClient } = require('../connect.js');

module.exports = {
  getClientsDB: async (to, from) => {
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
    // let queryDB = `SELECT * from clients WHERE clients.serviceOn >= '${to}' AND clients.serviceOn <= '${from}'`;
    let clients = await pool.query(queryDB);
    // console.log(clients.rows);
    // await pool.end();
    return clients.rows;
  },

};

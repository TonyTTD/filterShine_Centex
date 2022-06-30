const { getClient } = require('../connect.js');

// Controller functions that affect the filter table

module.exports = {
  getAllFilters: async () => {
    // query the DB to grab all filter info
    let pool = await getClient();
    let queryDB = `
    Select filters.id, filters.type, filters.stock, SUM(filters_installed.installed) AS installed
    FROM filters
    JOIN filters_installed
    ON filters_installed.filter_id = filters.id
    GROUP BY filters.id;`;

    let filters = await pool.query(queryDB);

    return filters.rows;
  },
  addFilter: async (qty) => {
    // query the DB to add a new record to the filter table
    let pool = await getClient();
    console.log(qty);
  },
  removeFilter: async (qty) => {
    // removes a filter type from filter table
    console.log(qty, 'remove');
  },
}
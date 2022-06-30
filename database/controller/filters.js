const { getClient } = require('../connect.js');

// Controller functions that affect the filter table

module.exports = {
  getAllFilters: async () => {
    // query the DB to grab all filter info
    try {
      let pool = await getClient();
      let queryDB = `
      Select filters.id, filters.type, filters.stock, SUM(filters_installed.installed) AS installed
      FROM filters
      JOIN filters_installed
      ON filters_installed.filter_id = filters.id
      GROUP BY filters.id;`;
      let filters = await pool.query(queryDB);
      return filters.rows;
    }
    catch (err) {
      throw err;
    }
  },
  addFilter: async (qty, id) => {
    try {
      let pool = await getClient();
      let queryDB = `
        UPDATE filters
        SET stock = (SELECT filters.stock FROM filters WHERE filters.id = ${id}) + ${qty}
        WHERE filters.id = ${id}
        RETURNING *;`;
      let addedFilterCount = await pool.query(queryDB);
      console.log(addedFilterCount)
    }
    catch (err) {
      throw err;
    }
  },
  removeFilter: async (qty, id) => {
    try {
      let pool = await getClient();
      let queryDB = `
        UPDATE filters
        SET stock = (SELECT filters.stock FROM filters WHERE filters.id = ${id}) - ${qty}
        WHERE filters.id = ${id}
        RETURNING *;`;
      let removedFilterCount = await pool.query(queryDB);
      console.log(removedFilterCount)
    }
    catch (err) {
      throw err;
    }
  },
}
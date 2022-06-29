const { getClient } = require('../connect.js');

// Controller functions that affect the filter table

module.exports = {
  getAllFilters: async () => {
    // query the DB to grab the total filter count
  },
  addFilter: async () => {
    // query the DB to add a new record to the filter table
  },
  removeFilter: async () => {
    // removes a filter type from filter table
  },
}
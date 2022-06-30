const { getAllFilters, addFilter, removeFilter } = require('../../../database/controller/filters.js');

module.exports = {
  getFilters: async (req, res) => {
    try {
      const filters = await getAllFilters();
      res.status(200).json(filters);
    }
    catch (err) {
      res.status(404).json({
        message: `error: ${err}`
      });
    }

  },
  updateFilterCount: async (req, res) => {
    try {
      if (req.body.add) {
        await addFilter(req.body.add);
        res.status(200);
      }
      if (req.body.remove) {
        await removeFilter(req.body.remove);
        res.status(200);
      }
    }
    catch (err) {
      res.status(404).json({
        message: `error: ${err}`
      });
    }
  }
};
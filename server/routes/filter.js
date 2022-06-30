const express = require('express');
const router = express.Router();
const { getFilters, updateFilterCount } = require('./controller/filter.js');

router.get('/', getFilters);
router.put('/', updateFilterCount);

module.exports = router;
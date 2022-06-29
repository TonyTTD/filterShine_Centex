const express = require('express');
const router = express.Router();
const clientRoute = require('./client.js');
const filterRoute = require('./filter.js');

router.use('/client', clientRoute);

router.use('/filter', filterRoute);

module.exports = router;
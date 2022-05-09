const express = require('express');
const router = express.Router();
const clientRoute = require('./client.js');

router.use('/client', clientRoute);

module.exports = router;
const express = require('express');
const router = express.Router();
const { getClientsByDate } = require('./controller/clients.js');

router.get('/', getClientsByDate);

module.exports = router;
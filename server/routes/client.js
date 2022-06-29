const express = require('express');
const router = express.Router();
const { getAllClients } = require('./controller/clients.js');

router.get('/', getAllClients);

//Add API endpoint for a post request to the DB to add a new client

module.exports = router;
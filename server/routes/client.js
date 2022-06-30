const express = require('express');
const router = express.Router();
const { getAllClients, updateClientServiceDate, updateClientCycle } = require('./controller/clients.js');

router.get('/', getAllClients);
router.put('/update/:task', (req, res) => {
  try {
    if (req.params.task === 'serviceon') {
      updateClientServiceDate(req, res);
    }
    if (req.params.task === 'cycle') {
      updateClientCycle(req, res);
    }
  }
  catch (err) {
    res.status(202).json({
      message: `error: Invalid parameter`
    })
  }
});

module.exports = router;
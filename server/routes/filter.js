const express = require('express');
const router = express.Router();
const {} = require('./controller/filter.js');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Success'
  });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const route = require('./routes/index.js');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3003;

app.use(cors({
  origin: [
    "*", `http://localhost:4000`
  ],
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: false,
}));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use('/filtershine/api', route);

module.exports = router;

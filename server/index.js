const express = require('express');
const router = express.Router();
const route = require('./routes/index.js');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());

const port = process.env.SERVERPORT || 3003;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.SERVER_EC2}:3000`);
  res.header(
    "Access-Control-Allow-Headers"
  );
  next();
});
app.use(cors({
  origin: [
    "*", `http://localhost:4000`, `http://localhost:3000`, `${process.env.SERVER_EC2}:4000`, `${process.env.SERVER_EC2}:3000`
  ],
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: false,
}));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use('/filtershine/api', route);

module.exports = router;

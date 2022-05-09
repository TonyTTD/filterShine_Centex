const express = require('express');
const router = express.Router();
const route = require('./routes/index.js');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
  origin: [
    "http://localhost:3003"
  ],
  methods: ["GET", "POST","PUT","DELETE"],
  credentials: false,
}));

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// app.get('/', (req, res) => {
//   console.log('Received GET request...');
//   res.send('Hello World');
// });
app.use('/filtershine/api', route);

// router.use('/filtershine/api', route);

module.exports = router;
//Need to serve up my react apt via the static file path
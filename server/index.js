const express = require('express');

const app = express();

app.use(express.json());

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get('/', (req, res) => {
  console.log('Received GET request...');
  res.send('Hello World');
});

//Need to serve up my react apt via the static file path
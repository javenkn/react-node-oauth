const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  }),
);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

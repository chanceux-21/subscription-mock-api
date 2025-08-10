// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Subscription API is working!');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
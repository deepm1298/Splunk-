const express = require('express');
const app = express();
const port = 5001;

app.get('/execute-search', (req, res) => {
  // Handle your API logic here
  // Example:
  res.send('Hello from Node.js server!');
});

app.listen(port, () => {
  console.log(`Node.js server running at http://localhost:${port}`);
});
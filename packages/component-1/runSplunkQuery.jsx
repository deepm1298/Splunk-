const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

app.post('/execute-search', async (req, res) => {
  const { searchQuery } = req.body;

  try {
    const response = await fetch('http://localhost:8089/services/search/jobs', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('admin:deep1298').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `search=${encodeURIComponent(searchQuery)}`,
    });

    const data = await response.json();
    if (data) {
      res.json({ results: data.results });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while executing the search.' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
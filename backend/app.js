const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 5001;

let storedData = null; // Variable to store data

app.use(cors());
app.use(express.json());

app.post('/apps', (req, res) => {
  
  const searchQuery = req.body.searchQuery;

  const pythonProcess = exec(`python ListApps.py "${searchQuery}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Python script error: ${stderr}`);
      return;
    }
    storedData = stdout.trim(); // Save data received from the Python script
    console.log('Received data from Python:', storedData);
  });

  pythonProcess.stdin.end();

  res.status(200).json({ message: 'Search query received successfully!', query: searchQuery });
});

app.get('/apps', (req, res) => {
  if (storedData !== null) {
    res.status(200).json({ data: storedData });
  } else {
    res.status(404).json({ message: 'No data available' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
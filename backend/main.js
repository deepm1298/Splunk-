const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 5003;

let storedData = null; // Variable to store data

app.use(cors());
app.use(express.json());

app.post('/saved-search', (req, res) => {
  
  const searchQuery = req.body.searchQuery;

  const pythonProcess = exec(`python ListSavedSearches.py "${searchQuery}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Python script error: ${stderr}`);
      return;
    }
    storedData = stdout.trim(); // Save data received from the Python script
    console.log(storedData);
  });

  pythonProcess.stdin.end();

  res.status(200).json({ message: 'Search query received successfully!', query: searchQuery });
});

app.get('/saved-search', (req, res) => {
  
  if (storedData !== null) {
    res.status(200).json({ data: storedData });
  } else {
    res.status(404).json({ message: 'No data available' });
  }
});

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


app.post('/dashboard', (req, res) => {
 
  const searchQuery = req.body.searchQuery;

  // Assuming '2.py' script saves data somewhere accessible by this Node.js server
  const pythonProcess = exec(`python ListDashboard.py "${searchQuery}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Python script error: ${stderr}`);
      return;
    }
    // Assuming Python script saves data to 'storedData'
    storedData = stdout; // Save data received from the Python script
    console.log('Received data from Python:', storedData);
  });

  pythonProcess.stdin.end();

  res.status(200).json({ message: 'Search query received successfully!', query: searchQuery });
});

app.get('/dashboard', (req, res) => {
  // Handle the GET request here
  // Retrieve and send back the stored data or perform other necessary actions
  if (storedData !== null) {
    res.status(200).json({ data: storedData });
  } else {
    res.status(404).json({ message: 'No data available' });
  }
});
app.post('/execute-search', (req, res) => {

  const searchQuery = req.body.searchQuery;

  // Assuming '2.py' script saves data somewhere accessible by this Node.js server
  const pythonProcess = exec(`python ListFields.py "${searchQuery}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Python script error: ${stderr}`);
      return;
    }
    // Assuming Python script saves data to 'storedData'
    storedData = stdout; // Save data received from the Python script
    console.log('Received data from Python:', storedData);
  });

  pythonProcess.stdin.end();

  res.status(200).json({ message: 'Search query received successfully!', query: searchQuery });
});

app.get('/execute-search', (req, res) => {
  // Handle the GET request here
  // Retrieve and send back the stored data or perform other necessary actions
  if (storedData !== null) {
    res.status(200).json({ data: storedData });
  } else {
    res.status(404).json({ message: 'No data available' });
  }
});


app.post('/overview', (req, res) => {
  storedData = null;
  const searchQuery = req.body.searchQuery;

  const pythonProcess = exec(`python overview.py "${searchQuery}"`, (error, stdout, stderr) => {
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

  res.status(200).json({ query: searchQuery });
});

app.get('/overview', (req, res) => {
  if (storedData !== null) {
    res.status(200).json({ data: storedData });
  } else {
    res.status(404).json({ message: 'No data available' });
  }
});

app.post('/redis-search', (req, res) => {
  const searchQuery = req.body.searchQuery;

  const pythonProcess = exec(`python test.py "${searchQuery}"`, (error, stdout, stderr) => {
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


app.post('/search', (req, res) => {
 
  const searchQuery = req.body.searchQuery;

  // Perform actions based on the received searchQuery
  if (searchQuery) {
    // Example: Logging the search query
    console.log('Received search query:', searchQuery);

    // Example: Perform search operation using the searchQuery

    // Respond with a success message
    res.status(200).json({ message:"hi",query: searchQuery });
  } else {
    // If searchQuery is missing or invalid, respond with an error message
    res.status(400).json({ message: 'Invalid search query' });
  }
});
app.get('/search', (req, res) => {
  if (storedData !== null) {
    res.status(200).json({ data: storedData });
  } else {
    res.status(404).json({ message: 'No data available' });
  }
});






app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
import React, { useState } from 'react';
import Component2 from '@splunk/component-2';
import Component3 from '@splunk/component-3';
const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const Component1 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [displayComponent, setDisplayComponent] = useState(false);
  const [displayComponent3, setDisplayComponent3] = useState(false);

  const test1 = async () => {
    try {
      
      const response = await fetch('http://localhost:5002/dashboard', {
        
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });
      await sleep(1000);

      const data = await response.json();
      
      if (data.results) {
        
        setSearchResults(data.results);
        setError('');
      }
    } catch (error) {
      console.error('Error:', error);

      setError('An error occurred while executing the search.');
    }
    setDisplayComponent(true);
  };
  const test2 = async () => {
    try {
      const response = await fetch('http://localhost:5001/execute-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });

      const data = await response.json();
      if (data.results) {
        setSearchResults(data.results);
        setDisplayComponent(true);
        setError('');
      }
    } catch (error) {
      console.error('Error:', error);
      setDisplayComponent(true);
      setError('An error occurred while executing the search.');
    }
  };

  const executeSearch = async () => {
    try {
      const response = await fetch('http://localhost:5001/execute-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });
      await sleep(30000);
      const data = await response.json();
      if (data.results) {
        setSearchResults(data.results);
        setError('');
      }
    } catch (error) { 
      setError('An error occurred while executing the search.');
    }
    setDisplayComponent3(true);
  };

  return (
    <div>

      <button onClick={executeSearch}>Execute Search</button>
      <button onClick={test1}>Test1</button>
      <button onClick={test2}>Test2</button>

      {displayComponent && <Component2 />}
      {displayComponent3 && <Component3 />}

      {searchResults.length > 0 && (
        <div>
          <h3>Search Results:</h3>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      )}

      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Component1;
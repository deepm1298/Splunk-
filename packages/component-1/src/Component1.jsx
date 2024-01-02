import React, { useState } from 'react';
import Button from '@splunk/react-ui/Button';
import Component2 from '@splunk/component-2';
import Component3 from '@splunk/component-3';
import Component4 from '@splunk/component-4';
import Component5 from '@splunk/component-5';

const sleep = (milliseconds) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const Component1 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const [displayedButton, setDisplayedButton] = useState(null); // New state to track the displayed button

  const test3 = async () => {
    try {
      const response = await fetch('http://localhost:5003/apps', {
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
      setError('An error occurred while executing the search.');
    }
    setDisplayedButton('test3'); // Update displayed button after successful fetch
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
    setDisplayedButton('executeSearch'); // Update displayed button after successful fetch
  };

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
      setError('An error occurred while executing Test 1.');
    }
    setDisplayedButton('test1'); // Update displayed button after successful fetch
  };

  const test2 = async () => {
    try {
      const response = await fetch('http://localhost:5003/saved-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });
      await sleep(3000);
      const data = await response.json();
      if (data.results) {
        setSearchResults(data.results);
        setError('');
      }
    } catch (error) {
      setError('An error occurred while executing Test 2.');
    }
    setDisplayedButton('test2'); // Update displayed button after successful fetch
  };

  return (
    
    <div>
      <Button onClick={executeSearch} disabled={displayedButton === 'executeSearch'} label="executeSearch" appearance="secondary" />
      <Button onClick={test1} disabled={displayedButton === 'test1'} label="Test1" appearance="secondary" />
      <Button onClick={test2} disabled={displayedButton === 'test2'} label="Test2" appearance="secondary" />
      <Button onClick={test3} disabled={displayedButton === 'test3'} label="Test3" appearance="secondary" />


      {displayedButton === 'executeSearch' && <Component3 />}
      {displayedButton === 'test1' && <Component2 />}
      {displayedButton === 'test2' && <Component4 />}
      {displayedButton === 'test3' && <Component5 />}

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
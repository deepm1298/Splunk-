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

  const ListApps = async () => {
    try {
      const response = await fetch('http://localhost:5003/apps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });
      await sleep(5000);
      const data = await response.json();
      if (data.results) {
        setSearchResults(data.results);
        setError('');
      }
    } catch (error) {
      setError('An error occurred while executing the search.');
    }
    setDisplayedButton('ListApps'); // Update displayed button after successful fetch
  };

  const ListFields = async () => {
    try {
      const response = await fetch('http://localhost:5003/execute-search', {
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
    setDisplayedButton('ListFields'); // Update displayed button after successful fetch
  };

  const ListDashboards = async () => {
    try {
      const response = await fetch('http://localhost:5003/dashboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });
      await sleep(7000);
      const data = await response.json();
      if (data.results) {
        setSearchResults(data.results);
        setError('');
      }
    } catch (error) {
      setError('An error occurred while executing Test 1.');
    }
    setDisplayedButton('ListDashboards'); // Update displayed button after successful fetch
  };

  const ListSavedSearches = async () => {
    try {
      const response = await fetch('http://localhost:5003/saved-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchQuery }),
      });
      await sleep(5000);
      const data = await response.json();
      if (data.results) {
        setSearchResults(data.results);
        setError('');
      }
    } catch (error) {
      setError('An error occurred while executing Test 2.');
    }
    setDisplayedButton('ListSavedSearches'); // Update displayed button after successful fetch
  };

  return (
    
    <div>
      <Button onClick={ListFields} disabled={displayedButton === 'ListFields'} label="List Fields" appearance="secondary" />
      <Button onClick={ListDashboards} disabled={displayedButton === 'ListDashboards'} label="List Dashboards" appearance="secondary" />
      <Button onClick={ListSavedSearches} disabled={displayedButton === 'ListSavedSearches'} label="List SavedSearches" appearance="secondary" />
      <Button onClick={ListApps} disabled={displayedButton === 'ListApps'} label="List Apps" appearance="secondary" />


      {displayedButton === 'ListFields' && <Component3 />}
      {displayedButton === 'ListDashboards' && <Component2 />}
      {displayedButton === 'ListSavedSearches' && <Component4 />}
      {displayedButton === 'ListApps' && <Component5 />}

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
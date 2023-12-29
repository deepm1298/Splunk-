import React, { useState } from 'react';

const Component1 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  const executeSearch = async () => {
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
        setError('');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while executing the search.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={executeSearch}>Execute Search</button>

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

import React, { useState } from 'react';
import SearchResults from '@splunk/search-results';

const SearchingBar = () => {
    const [value, setValue] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSearch = () => {
        if (value.trim() === '') {
            // Handle empty search query
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            fetch('http://localhost:5003/redis-search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ searchQuery: value }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    setSearchResult(data);
                    setError(null);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Error searching: ' + error.message);
                    setSearchResult(null);
                    setIsLoading(false);
                });
        }, 6000);
    };

    return (
        <div style={{ textAlign: 'left', margin: '20px' }}>
            <input
                type="text"
                placeholder="Enter your search query"
                value={value}
                onChange={handleChange}
                style={{
                    padding: '10px',
                    marginRight: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    width: '300px', // Adjust the width as needed
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    padding: '10px 20px',
                    borderRadius: '5px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Search
            </button>
            {isLoading && (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>Loading...</span>
                    <div className="spinner-border ml-2" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {searchResult && searchResult.length === 0 && <div>No results found.</div>}
            {searchResult && <SearchResults data={searchResult} />}
            {error && <div style={{ color: 'red' }}>Error: {error}</div>}
        </div>
    );
};

export default SearchingBar;
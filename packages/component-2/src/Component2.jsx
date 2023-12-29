import React, { useState, useEffect } from 'react';

const Component2 = () => {
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/execute-search');
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      {fetchedData ? (
        <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Component2;
import React, { useEffect, useState } from 'react';

const Component2 = () => {
  const [queryData, setQueryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(30); // Updated to display 30 records per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5003/dashboard');
        const responseData = await response.json();

        // Extract the JSON string from the response data
        const jsonString = responseData.data.match(/\[(.*)\]/s)[0];
        const jsonData = JSON.parse(jsonString);

        // Log the fetched JSON data
        console.log('Fetched data:', jsonData);

        setQueryData(jsonData);
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    };

    fetchData();
  }, []);

  // Get current records for the current page
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = queryData.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="full-screen-container"> {/* Apply full-screen container */}
      <h2>Total Records: {queryData.length}</h2>
      {/* Display fetched data in a table */}
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>owner</th>
            <th>label</th>
            <th>eaiappName</th>
     
          </tr>
        </thead>
        <tbody>
          {Array.isArray(currentRecords) && currentRecords.length > 0 ? (
            currentRecords.map((item, index) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.owner}</td>
                <td>{item.label}</td>
                <td>{item.eaiappName}</td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(queryData.length / recordsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Component2;
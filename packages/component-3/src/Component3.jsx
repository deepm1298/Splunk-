import React, { useEffect, useState } from 'react';

const Component3 = () => {
  const [queryData, setQueryData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(25); // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5003/execute-search');
        const jsonData = await response.json();

        // Extracting and parsing the query data
        const queryDataString = jsonData.data.match(/'query': '(.*)'/);
        if (queryDataString && queryDataString.length > 1) {
          const cleanedQueryJSONString = queryDataString[1]
            .replace(/\\\\/g, '\\')
            .replace(/"\\\\"/g, '') // Removing escaped double quotes
            .replace(/\\"/g, ''); // Removing remaining escaped double quotes
          const parsedQueryArray = JSON.parse(cleanedQueryJSONString);

          // Removing non-alphabetic characters from strings
          const cleanedQueryData = parsedQueryArray.map((item) =>
            item.replace(/[^a-zA-Z]/g, '')
          );

          setQueryData(cleanedQueryData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Logic for displaying items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = queryData && queryData.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for calculating total pages
  const totalPages = Math.ceil((queryData && queryData.length) / itemsPerPage);

  // Function to handle page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {currentItems && (
        <div>
          <ul>
            {currentItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Pagination information */}
          <p>
            Showing {indexOfFirstItem + 1} -{' '}
            {indexOfLastItem > queryData.length ? queryData.length : indexOfLastItem} of{' '}
            {queryData.length} records
          </p>

          {/* Pagination buttons */}
          {totalPages > 1 && (
            <div>
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              <span> Page {currentPage} of {totalPages} </span>
              <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= queryData.length}>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Component3;
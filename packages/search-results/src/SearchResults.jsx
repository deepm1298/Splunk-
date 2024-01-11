import React, { useState, useEffect } from 'react';

// Modified Card component
const Card = ({ content }) => (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
        <p style={{ margin: '0' }}>{content.trim()}</p>
    </div>
);

const SearchingResults = () => {
    const [cleanedData, setCleanedData] = useState(null);
    const [error, setError] = useState(null);
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5003/search');

                if (!isMounted) {
                    return;
                }

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                let cleanedData = data.data.replace(/[},{\[\]'"]/g, '');
                cleanedData = cleanedData.replace(/message: hi query:/g, '');
                cleanedData = cleanedData.split('nsotest').join(',');
                cleanedData = cleanedData.split('ohyes').join('\n');
                
                setCleanedData(cleanedData);
                setError(null);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                if (isMounted) {
                    setError('Error fetching data: ' + error.message);
                    setCleanedData(null);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    const totalPages = Math.ceil(cleanedData?.split('\n').length / itemsPerPage);
    const pagesArray = Array.from({ length: totalPages }, (_, index) => index + 1);

    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return (
        <div>
            {loading && <div>Loading...</div>}

            {cleanedData &&
                !loading &&
                cleanedData
                    .split('\n')
                    .slice(startIndex, endIndex)
                    .map((line, index) => <Card key={index} content={line} />)}

            {totalPages > 1 && (
                <div>
                    <div>
                        {pagesArray.map((page) => (
                            <button
                                key={page}
                                onClick={() => handlePagination(page)}
                                style={{
                                    margin: '5px',
                                    padding: '5px 10px',
                                    borderRadius: '5px',
                                    backgroundColor: currentPage === page ? '#4CAF50' : '#fff',
                                    color: currentPage === page ? '#fff' : '#000',
                                    border: '1px solid #ccc',
                                    cursor: 'pointer',
                                }}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                    <p>Page {currentPage} of {totalPages}</p>
                </div>
            )}

            {error && <div>Error fetching data: {error}</div>}
        </div>
    );
};

export default SearchingResults;
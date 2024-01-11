import React, { useEffect, useState } from 'react';
import Card from '@splunk/react-ui/Card';
import DL from '@splunk/react-ui/DefinitionList';

const Overview = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Introduce a delay of 6 seconds (6000 milliseconds) before fetching data
        await new Promise(resolve => setTimeout(resolve, 6000));

        const response = await fetch('http://localhost:5006/overview');
      
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        
        const responseData = await response.json();
        console.log(responseData); // Log the entire response

        const jsonString = responseData.data.match(/\{.*\}/)[0];
        const parsedData = JSON.parse(jsonString);

        if (parsedData) {
          setData(parsedData);
        } else {
          throw new Error('Data could not be parsed.');
        }
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Overview Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {Object.entries(data).map(([key, value]) => (
          <Card key={key} style={{ flex: '0 0 300px', marginBottom: '20px' }}>
            <Card.Header title={key} />
            <Card.Body>
              <DL termWidth={222}>
                <DL.Term>{key}</DL.Term>
                <DL.Description>{value}</DL.Description>
              </DL>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Overview;
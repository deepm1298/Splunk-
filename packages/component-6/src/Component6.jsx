import React, { useState } from 'react';
import Button from '@splunk/react-ui/Button';
import Component1 from '@splunk/component-1'; // Import Component1 here
import Overview from '@splunk/overview';
import Search from '@splunk/searching-bar';

const Component6 = () => {
  const [displayedData, setDisplayedData] = useState('');
  const [showComponent1, setShowComponent1] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showSearch, setSearch] = useState(false);

  const handleButtonClick = async (buttonLabel) => {
    let data = '';

    if (buttonLabel === 'First') {
      setSearch(false);
      setShowComponent1(true);
      setShowOverview(false);
      // Some logic to fetch or generate data for the first button
    
    } else if (buttonLabel === 'Second') {
      setSearch(false);
      setShowComponent1(false);
      setShowOverview(true);
      // Send a POST request to http://localhost:5003/overview
      try {
        const response = await fetch('http://localhost:5006/overview', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers if needed
          },
          // Add body content if required
          body: JSON.stringify({ key: 'value' }), // Replace with your data object
        });

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        // Process the response data if needed
        const responseData = await response.json();
        console.log('POST request successful:', responseData);

     
      } catch (error) {
        console.error('Error sending POST request:', error);
      }
    } else if (buttonLabel === 'Third') {
      setSearch(true);
      // Some logic to fetch or generate data for the first button
      setShowComponent1(false);
      setShowOverview(false);

    }

    setDisplayedData(data);
  };

  return (
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form style={{ marginBottom: '20px' }}>
        <Button label="Overview" appearance="secondary" onClick={() => handleButtonClick('First')} />
        <Button label="Dashboard" appearance="secondary" onClick={() => handleButtonClick('Second')} />
        <Button label="Search" appearance="secondary" onClick={() => handleButtonClick('Third')} />
      </form>
      {showComponent1 ? <Component1 /> : null}
      {showSearch ? <Search /> : null}
      {showOverview ? <Overview /> : null}
      {displayedData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Displayed Data:</h3>
          <p>{displayedData}</p>
        </div>
      )}
    </div>
  );
};

export default Component6;
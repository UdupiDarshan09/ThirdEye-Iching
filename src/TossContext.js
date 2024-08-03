import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TossContext = createContext();

export const TossProvider = ({ children }) => {
  const [tossData, setTossData] = useState(null);

  useEffect(() => {
    const fetchTossData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/toss');
        setTossData(response.data);
      } catch (error) {
        console.error('Error fetching toss data:', error.message);
      }
    };

    fetchTossData();

    // Subscribe to updates every 5 seconds
    const intervalId = setInterval(fetchTossData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <TossContext.Provider value={tossData}>
      {children}
    </TossContext.Provider>
  );
};

import React, { createContext, useState, useEffect, useContext } from 'react';

// Create EventContext
export const EventContext = createContext();

// Create a custom hook to use the EventContext
export const useEvents = () => {
  return useContext(EventContext);
};

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);    
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    

  const API_URL = 'http://localhost:5000/api/events';

  const fetchEvents = async () => {
    setLoading(true);  
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setEvents(data);  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    fetchEvents();  
  }, []);  

  return (
    <EventContext.Provider value={{ events, loading, error }}>
      {children}
    </EventContext.Provider>
  );
};

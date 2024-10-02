import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { EventProvider } from './EventContext'; // import the provider

// Get the root element
const container = document.getElementById('root');

// Create the root
const root = createRoot(container);

// Render the app inside the provider
root.render(
  <EventProvider>
    <App />
  </EventProvider>
);

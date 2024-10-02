import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import Login from './components/login';
import EventPage from './eventpage'; 
import Contact from "./contactus";
import EventDetails from './EventDetails';
import Services from './Services';
import ServiceDetail from './ServiceDetail';
import More from './more';
import Confirmation from './confirmation';
import ProtectedRoute from './PrivateRoute'; // Import the ProtectedRoute component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/confirmation" element={<ProtectedRoute element={<Confirmation />} />} />
        <Route path="/services" element={<ProtectedRoute element={<Services />} />} />
        <Route path="/services/:id" element={<ProtectedRoute element={<ServiceDetail />} />} />
        <Route path="/contactus" element={<ProtectedRoute element={<Contact />} />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/more" element={<ProtectedRoute element={<More />} />} /> 
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/events/:id" element={<ProtectedRoute element={<EventDetails />} />} />
        <Route path="/events" element={<ProtectedRoute element={<EventPage />} />} />
      </Routes>
    </Router>
  );
};

export default App;

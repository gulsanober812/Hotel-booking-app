import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewBookingPage from './pages/NewBookingPage';
import BookingsPage from './pages/BookingsPage';
import BookingSummary from './pages/BookingSummary';

import "./index.css"
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <div >
     <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book" element={<NewBookingPage />} />
          <Route path="/bookings" element={<BookingsPage />} />
           <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/summary/:id" element={<BookingSummary />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
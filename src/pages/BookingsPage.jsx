 import React from "react";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import BookingCard from '../components/BookingCard';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBookings = () => {
      try {
        const storedData = localStorage.getItem('bookings');
        
        // Handle cases where data doesn't exist or is empty
        if (!storedData || storedData === 'undefined') {
          localStorage.setItem('bookings', JSON.stringify([]));
          setBookings([]);
          return;
        }

        const parsedBookings = JSON.parse(storedData);
        
        // Validate the parsed data is an array
        if (!Array.isArray(parsedBookings)) {
          throw new Error('Invalid bookings data format');
        }

        // Filter out any invalid entries
        const validBookings = parsedBookings.filter(booking => 
          booking.id && 
          booking.name && 
          booking.date && 
          booking.time
        );

        setBookings(validBookings);
        
        // Update storage with cleaned data if needed
        if (validBookings.length !== parsedBookings.length) {
          localStorage.setItem('bookings', JSON.stringify(validBookings));
        }
      } catch (err) {
        console.error('Failed to load bookings:', err);
        setError('Failed to load bookings. Please refresh the page.');
        // Reset to empty array if parsing fails
        localStorage.setItem('bookings', JSON.stringify([]));
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const updateBookings = (updatedBookings) => {
    try {
      setBookings(updatedBookings);
      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    } catch (err) {
      console.error('Failed to update bookings:', err);
      setError('Failed to save changes. Please try again.');
    }
  };

  const handleDelete = (id) => {
    const updatedBookings = bookings.filter(booking => booking.id !== id);
    updateBookings(updatedBookings);
  };

  const handleCancel = (id) => {
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { 
        ...booking, 
        status: 'cancelled',
        cancelledAt: new Date().toISOString()
      } : booking
    );
    updateBookings(updatedBookings);
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      
       
      <div className="mb-6 flex space-x-4">
        <button 
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('confirmed')}
          className={`px-4 py-2 rounded-md ${filter === 'confirmed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Confirmed
        </button>
        <button 
          onClick={() => setFilter('cancelled')}
          className={`px-4 py-2 rounded-md ${filter === 'cancelled' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Cancelled
        </button>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-600">No bookings found</p>
          <Link 
            to="/book" 
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Make a new booking
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredBookings
            .sort((a, b) => dayjs(b.createdAt).isBefore(dayjs(a.createdAt)) ? -1 : 1)
            .map(booking => (
              <BookingCard 
                key={booking.id}
                booking={booking}
                onDelete={handleDelete}
                onCancel={handleCancel}
              />
            ))}
        </div>
      )}
    </div>
  );
}
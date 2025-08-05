import React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import BookingForm from '../components/BookingForm';

const apartmentOptions = [
  { id: 'studio', name: 'Studio Apartment' },
  { id: '1bed', name: '1-Bedroom Apartment' },
  { id: '2bed', name: '2-Bedroom Apartment' },
  { id: 'penthouse', name: 'Penthouse Suite' },
  { id: 'executive', name: 'Executive Suite' },
];

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00'
];

export default function NewBookingPage() {
  const [formData, setFormData] = useState({
    name: '',
    apartment: '',
    date: dayjs().format('YYYY-MM-DD'),
    time: '10:00',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!formData.apartment) {
      setError('Please select an apartment');
      return;
    }
    
    // Check for conflicting bookings
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const conflict = bookings.some(booking => 
      booking.apartment === formData.apartment &&
      booking.date === formData.date &&
      booking.time === formData.time
    );
    
    if (conflict) {
      setError('This apartment is already booked for the selected date and time');
      return;
    }
    
    // Create new booking
    const newBooking = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };
    
    const updatedBookings = [...bookings, newBooking];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    setSuccess(true);
    setTimeout(() => {
      navigate('/bookings');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">New Booking</h1>
      
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Booking confirmed! Redirecting to your bookings...
        </div>
      ) : (
        <>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <BookingForm 
            formData={formData}
            apartmentOptions={apartmentOptions}
            timeSlots={timeSlots}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
}
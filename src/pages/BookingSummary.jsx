import React from "react";
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaCalendarAlt, FaClock, FaHome, FaUser, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function BookingSummary() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const foundBooking = bookings.find(b => b.id === id);
    
    if (foundBooking) {
      setBooking(foundBooking);
    } else {
      navigate('/bookings');
    }
    setLoading(false);
  }, [id, navigate]);

  const getApartmentName = () => {
    switch (booking?.apartment) {
      case 'studio': return 'Studio Apartment';
      case '1bed': return '1-Bedroom Apartment';
      case '2bed': return '2-Bedroom Apartment';
      case 'penthouse': return 'Penthouse Suite';
      case 'executive': return 'Executive Suite';
      default: return booking?.apartment || 'Unknown';
    }
  };

  const getApartmentImage = () => {
    switch (booking?.apartment) {
      case 'studio': return 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
      case '1bed': return 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
      case '2bed': return 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
      case 'penthouse': return 'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
      case 'executive': return 'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
      default: return 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking not found</h2>
          <button
            onClick={() => navigate('/bookings')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg inline-flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button 
          onClick={() => navigate('/bookings')}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium inline-flex items-center transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Back to bookings
        </button>
        
        {/* Main card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header with status */}
          <div className={`p-6 text-white ${
            booking.status === 'confirmed' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'
          }`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                  {booking.status === 'confirmed' ? (
                    <FaCheckCircle className="text-white" />
                  ) : (
                    <FaTimesCircle className="text-white" />
                  )}
                  Booking Summary
                </h1>
                <p className="mt-2 opacity-90">Your booking details</p>
              </div>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                booking.status === 'confirmed' ? 'bg-green-700' : 'bg-red-700'
              }`}>
                {booking.status.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Apartment image */}
          <div className="h-48 sm:h-64 w-full bg-gray-200 overflow-hidden">
            <img 
              src={getApartmentImage()} 
              alt={getApartmentName()}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Booking details */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Left column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Booking Information</h3>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaUser className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Guest Name</p>
                        <p className="text-lg font-semibold text-gray-900">{booking.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaHome className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Apartment Type</p>
                        <p className="text-lg font-semibold text-gray-900">{getApartmentName()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date & Time</h3>
                  <div className="mt-2 space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaCalendarAlt className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Booking Date</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {dayjs(booking.date).format('dddd, MMMM D, YYYY')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FaClock className="text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Time Slot</p>
                        <p className="text-lg font-semibold text-gray-900">{booking.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Additional Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-500">Booking ID</p>
                  <p className="mt-1 text-base font-mono font-medium text-gray-900">{booking.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Booked On</p>
                  <p className="mt-1 text-base font-medium text-gray-900">
                    {dayjs(booking.createdAt).format('MMMM D, YYYY h:mm A')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with action buttons */}
          <div className="bg-gray-50 px-6 py-4 sm:px-8 sm:py-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={() => navigate('/bookings')}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Back to bookings
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Print confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
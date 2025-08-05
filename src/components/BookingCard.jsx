import  React from "react";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

export default function BookingCard({ booking, onDelete, onCancel }) {
  const getStatusColor = () => {
    switch (booking.status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-blue-700">
            {booking.apartment === 'studio' && 'Studio Apartment'}
            {booking.apartment === '1bed' && '1-Bedroom Apartment'}
            {booking.apartment === '2bed' && '2-Bedroom Apartment'}
            {booking.apartment === 'penthouse' && 'Penthouse Suite'}
            {booking.apartment === 'executive' && 'Executive Suite'}
          </h3>
          <p className="text-gray-600">Booked by: {booking.name}</p>
          <p className="text-gray-600">
            {dayjs(booking.date).format('MMMM D, YYYY')} at {booking.time}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {booking.status}
        </span>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <Link 
          to={`/summary/${booking.id}`}
          className="text-blue-600 hover:underline"
        >
          View Details
        </Link>
        
        <div className="space-x-2">
          {booking.status === 'confirmed' && (
            <button 
              onClick={() => onCancel(booking.id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={() => onDelete(booking.id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
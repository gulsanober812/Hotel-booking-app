import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaBuilding, FaCalendarAlt, FaClock, FaCheckCircle, FaChevronDown } from 'react-icons/fa';

const CustomSelect = ({ 
  options, 
  value, 
  onChange, 
  Icon, 
  placeholder, 
  className = "",
  name
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const selectRef = useRef(null);
  const inputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (value) => {
    onChange({ target: { name, value } });
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className={`relative ${className}`} ref={selectRef}>
      {/* Select Button */}
      <button
        type="button"
        className={`w-full px-4 py-3 pl-10 bg-white border ${
          isOpen ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-300'
        } rounded-lg flex items-center justify-between transition-all`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center overflow-hidden">
          {Icon && <Icon className="absolute left-3 text-gray-400" />}
          <span className="ml-2 text-left truncate">
            {value ? options.find(opt => opt.value === value)?.label : placeholder}
          </span>
        </div>
        <FaChevronDown 
          className={`ml-2 text-gray-400 transition-transform ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {/* Search input for mobile */}
          <div className="sticky top-0 p-2 bg-white border-b">
            <input
              type="text"
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Options list */}
          <div className="py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                    value === option.value ? 'bg-blue-100 font-medium' : ''
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function BookingForm({ formData, apartmentOptions, timeSlots, handleChange, handleSubmit }) {
  // Prepare select options
  const apartmentSelectOptions = [
    { value: "", label: "Select apartment type" },
    ...apartmentOptions.map(opt => ({
      value: opt.id,
      label: `${opt.name} - $${opt.price}/night`
    }))
  ];

  const timeSelectOptions = timeSlots.map(time => ({
    value: time,
    label: time
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background image with overlay */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-90"></div>
        <img 
          src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Form header */}
            <div className="bg-blue-600 p-6 text-white">
              <h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                <FaCheckCircle className="text-white" />
                Book Your Stay
              </h2>
              <p className="mt-2 opacity-90">Fill in your details to reserve your apartment</p>
            </div>

            {/* Form content */}
            <div className="p-6 sm:p-8">
              {/* Name field */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3 flex items-center gap-2" htmlFor="name">
                  <FaUser className="text-blue-600" />
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                  <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
              
              {/* Apartment selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3 flex items-center gap-2">
                  <FaBuilding className="text-blue-600" />
                  Apartment/Room Type
                </label>
                <CustomSelect
                  name="apartment"
                  options={apartmentSelectOptions}
                  value={formData.apartment}
                  onChange={handleChange}
                  Icon={FaBuilding}
                  placeholder="Select apartment type"
                />
              </div>
              
              {/* Date and time grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Date field */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3 flex items-center gap-2" htmlFor="date">
                    <FaCalendarAlt className="text-blue-600" />
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>
                
                {/* Time slot selection */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3 flex items-center gap-2">
                    <FaClock className="text-blue-600" />
                    Time Slot
                  </label>
                  <CustomSelect
                    name="time"
                    options={timeSelectOptions}
                    value={formData.time}
                    onChange={handleChange}
                    Icon={FaClock}
                    placeholder="Select time slot"
                  />
                </div>
              </div>
              
              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 mt-2"
              >
                <FaCheckCircle />
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
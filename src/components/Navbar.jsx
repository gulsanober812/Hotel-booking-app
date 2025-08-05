import { Link } from 'react-router-dom';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCSV = () => {
    const bookings = [
      { room: 'Conference A', guest: 'John Doe', checkIn: '08/05/2025', checkOut: '08/07/2025', status: 'Confirmed' },
      { room: 'Suite 301', guest: 'Jane Smith', checkIn: '08/10/2025', checkOut: '08/15/2025', status: 'Pending' }
    ];

    const csvContent = [
      ['Room', 'Guest Name', 'Check-In Date', 'Check-Out Date', 'Status'],
      ...bookings.map(booking => [
        `"${booking.room}"`,
        `"${booking.guest}"`,
        booking.checkIn,
        booking.checkOut,
        booking.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'room_bookings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-blue-700 shadow-lg' : 'bg-blue-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-white">Royal Crescent</Link>
          </div>

          {/* Desktop Navigation - ALWAYS VISIBLE ON DESKTOP */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link to="/book" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">Book Now</Link>
            <Link to="/bookings" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">My Bookings</Link>
            <Link to="/Aboutus" className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
            
            <button
              onClick={handleDownloadCSV}
              className="ml-4 flex items-center bg-white text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition-colors"
              title="Export Bookings as CSV"
            >
              <FiDownload className="mr-1" size={18} />
              <span className="text-sm font-medium">Export</span>
            </button>
          </div>

          {/* Mobile menu button - HIDDEN ON DESKTOP */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-200 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - HIDDEN ON DESKTOP */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-700">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-200 hover:bg-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/book"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-200 hover:bg-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            Book Now
          </Link>
          <Link
            to="/bookings"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-200 hover:bg-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            My Bookings
          </Link>
          <Link
            to="/Aboutus"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-blue-200 hover:bg-blue-600"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <button
            onClick={() => {
              handleDownloadCSV();
              setIsMenuOpen(false);
            }}
            className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium bg-white text-blue-600 hover:bg-blue-50"
          >
            <FiDownload className="mr-2" size={18} />
            Export
          </button>
        </div>
      </div>
    </nav>
  );
}
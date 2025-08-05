import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
      }}
    >
      {/* Navbar (make sure to import your Navbar component) */}
      {/* <Navbar /> */}

      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Enjoy Your <br className="hidden sm:block" />
              <span className="text-blue-300">Dream Vacation</span> <br className="hidden sm:block" />
              With Us
            </h1>
            <p className="text-lg mb-8 text-gray-200 max-w-lg">
              Royal Crescent Hotel Islamabad stands as a proud part of this journey—a 
              symbol of how a humble dream can grow into a celebrated sanctuary for travelers 
              seeking world-class comfort in the heart of Pakistan.
            </p>
            
            {/* Updated Discover More button with Link to AboutUs */}
            <Link 
              to="/Aboutus" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Discover More
            </Link>
          </div>
          
          {/* Optional content for larger screens */}
          <div className="md:w-1/2 md:pl-12 lg:pl-24 hidden md:block">
            {/* You can add testimonials, features, or another image here */}
            <div className="bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-blue-300 mb-3">Why Choose Us?</h3>
              <ul className="space-y-2 text-gray-200">
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">✓</span>
                  <span>Luxurious rooms with modern amenities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">✓</span>
                  <span>Prime location in the heart of Islamabad</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">✓</span>
                  <span>24/7 concierge service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-300 mr-2">✓</span>
                  <span>Award-winning dining experiences</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
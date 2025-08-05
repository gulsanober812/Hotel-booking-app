import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [blurAmount, setBlurAmount] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);

      // Calculate blur and opacity based on scroll position
      const newBlur = Math.min(position / 30, 8);
      const newOpacity = Math.max(1 - position / 300, 0.3);

      setBlurAmount(newBlur);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div><Navbar />
      <div className="relative min-h-screen overflow-hidden">

        {/* Full-screen background image with scroll effects */}
        <div
          className="fixed inset-0 w-full h-full bg-cover bg-center transition-all duration-300"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
            filter: `blur(${blurAmount}px)`,
            opacity: opacity,
            transform: `scale(${1 + scrollPosition / 2000})`
          }}
        ></div>

        {/* Dark overlay that fades as you scroll */}
        <div
          className="fixed inset-0 bg-black opacity-50 transition-opacity duration-300"
          style={{ opacity: 0.6 - (scrollPosition / 500) }}
        ></div>

        {/* Main content container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Hero section that takes full viewport height initially */}
          <div className="h-screen flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Welcome to Royal Crescent Hotel Islamabad
            </h1>
            <p className="text-xl sm:text-2xl text-white max-w-2xl mx-auto drop-shadow-md">
              Scroll to discover our story
            </p>
            <div className="mt-8 animate-bounce">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>

          {/* Content section that appears as you scroll */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg text-gray-700">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
                <p className="mb-6">
                  Nestled in the vibrant heart of Pakistan’s capital, Royal Crescent Hotel Islamabad first opened 
                  its doors in 2005 with just 20 elegantly appointed rooms—a peaceful sanctuary designed to
                   let guests experience the perfect harmony of luxury and comfort.

                       </p>

                <div className="my-10">
                  <img
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt="Hotel lobby"
                    className="w-full rounded-lg shadow-xl"
                  />
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Philosophy</h2>
                <p className="mb-6">
                  We believe that true hospitality is about creating memorable experiences. Every detail, from the
                  carefully selected linens to the locally-sourced ingredients in our restaurant, is chosen with
                  our guests' comfort in mind.
                </p>

                <div className="grid md:grid-cols-2 gap-8 my-10">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Sustainability</h3>
                    <p>
                      Committed to eco-friendly practices, we've reduced our carbon footprint by 40% over the past
                      five years through energy-efficient systems and waste reduction programs.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Community</h3>
                    <p>
                      We actively support local artisans and businesses, featuring regional artwork throughout
                      our property and sourcing 80% of our restaurant ingredients from within 50 miles.
                    </p>
                  </div>
                </div>

                <div className="my-10 bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-2xl font-bold text-blue-800 mb-3">Awards & Recognition</h3>
                  <ul className="space-y-2">
                    <li>★ "Best Luxury Hotel" - Hospitality Awards 2022</li>
                    <li>★ "Green Hotel of the Year" - Eco Travel 2021</li>
                    <li>★ "Top 10 Customer Service" - Travel & Leisure 2020-2023</li>
                  </ul>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-6">Meet Our Team</h2>
                <p className="mb-8">
                  Our dedicated team of hospitality professionals is committed to making your stay unforgettable.
                  From our concierge who knows all the city's hidden gems to our chefs who craft culinary masterpieces,
                  we're here to serve you.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {[
                  { name: "Ms. Ayesha Khan", role: "General Manager", img: "https://randomuser.me/api/portraits/women/44.jpg" },
                  { name: "Mr. Imran Malik,", role: "Head Chef", img: "https://randomuser.me/api/portraits/men/32.jpg" },
                  { name: "Mr. Danish Hussain", role: "Guest Relations", img: "https://randomuser.me/api/portraits/men/75.jpg" },
                  { name: "Emma Rizv", role: "Events Coordinator", img: "https://randomuser.me/api/portraits/women/63.jpg" },
                ].map((person, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-4 text-center border border-gray-100">
                    <img
                      src={person.img}
                      alt={person.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover mb-4 shadow-md"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{person.name}</h3>
                    <p className="text-gray-600 text-sm">{person.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
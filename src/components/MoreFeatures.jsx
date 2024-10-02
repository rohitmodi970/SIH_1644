import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import Graph from './Graph';
const MoreFeatures = () => {
  useEffect(() => {
    document.title = 'More Features - E-Coal';
  }, []);

  return (
    <>
    <Graph />
      <div className="min-h-screen bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] flex flex-col items-center justify-center p-6">
        {/* Title Section */}
        <h1 className="text-5xl font-extrabold text-gray-800 text-center mb-8">
          More Features Coming Soon
        </h1>

        {/* Feature Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* LSTM Integration */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">LSTM Integration</h2>
            <p className="text-gray-600">
              Experience advanced future prediction models with LSTM. Our machine learning system will predict long-term trends based on historical data, helping coal mining industries prepare for the future.
            </p>
            <p className="text-sm text-gray-500 mt-2">Coming Soon...</p>
          </div>

          {/* Chatbot Functionalities */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">Chatbot Functionalities</h2>
            <p className="text-gray-600">
              A smart AI-powered chatbot to answer all your queries about sustainable coal mining, emissions, and compliance monitoring in real time.
            </p>
            <p className="text-sm text-gray-500 mt-2">Coming Soon...</p>
          </div>

          {/* More Features */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center transform transition-transform duration-300 hover:scale-105">
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">And Many More...</h2>
            <p className="text-gray-600">
              Stay tuned for more innovative features including real-time worker health monitoring, VR safety training, and gamification to engage users in sustainable practices.
            </p>
            <p className="text-sm text-gray-500 mt-2">Coming Soon...</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12">
          <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex justify-center items-center">
            <lord-icon
              src="https://cdn.lordicon.com/qxvhathv.json"
              trigger="loop"
              delay="2000"
              stroke="bold"
              state="hover-rotation"
            >
            </lord-icon>
            <NavLink to="/features"
              className="ml-2 hover:font-bold"
              onMouseEnter={() => handleHover('icon1', 'mouseenter')}
              onMouseLeave={() => handleHover('icon1', 'mouseleave')}>
              Explore Current Features
            </NavLink>

          </button>
        </div>
      </div>
    </>
  );
};

export default MoreFeatures;


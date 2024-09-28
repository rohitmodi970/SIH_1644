import React from 'react';
import Footer from './Footer';
import About from './About';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background Theme */}
      <div className="fixed top-0 left-0 w-full h-full z-[-2] bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,0.5)_100%)] transform rotate-180"></div>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <About />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

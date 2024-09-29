import './App.css';
import Dashboard from './components/Dashboard';
import Gov_navbar from './components/Gov_navbar';
import Navbar from './components/Navbar';
import ContactUs from './components/Contact';
import About from './components/About';
import FeedbackForm from './components/Faq';
import Features from './components/Features';
import Carboncalculator from './components/Safety';
import Footer from './components/Footer';
import Layout from './components/Layouts';
import Carbonemission from './components/Carbonemission';
import Assist from './components/Assist';
import Home from './components/Home';
import Login from './components/Login';
import MoreFeatures from './components/MoreFeatures';
import Graph from './components/Graph';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  // Define your routes using createBrowserRouter
  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <Navbar /> <Home />
      </>
    },
    {
      path: '/home',
      element: <>
        <Navbar /> <Home />
      </>
    },
    {
      path: '/contact',
      element: <>
        <Navbar /> <ContactUs />
      </>
    },
    {
      path: '/about',
      element: <>
        <Navbar /> <About />
      </>
    }
    ,
    {
      path: '/faq',
      element: <>
        <Navbar /> <FeedbackForm />
      </>
    }
    ,
    {
      path: '/features',
      element: <>
        <Navbar /> <Features />
      </>
    }
    ,
    {
      path: '/carboncalculator',
      element: <>
        <Navbar /> <Carboncalculator />
      </>
    }
    ,
    {
      path: '/carbonemission',
      element: <>
        <Navbar /> <Carbonemission />
      </>
    }
    ,
    {
      path: '/login',
      element: <>
      <Navbar /> <Login />
      </>
    }
    ,
    {
      path: '/moreFeatures',
      element: <>
      <Navbar /> <MoreFeatures />
      </>
    }
  ]);

  return (
    <>
      <div className="no-scroll-x absolute top-0 z-[-2] min-h-full min-w-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]" style={{ height: '300px' }}>
      </div>

      <Gov_navbar />
      <RouterProvider router={router} />

      <div className='bg-slate-300'>
      </div>
      <Assist />

      <Footer />
    </>
  );
}

export default App;

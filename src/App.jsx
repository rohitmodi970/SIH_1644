import './App.css';
import Dashboard from './components/Dashboard';
import Gov_navbar from './components/Gov_navbar';
import Navbar from './components/Navbar';
import ContactUs from './components/Contact';
import About from './components/About';
import FeedbackForm from './components/Faq';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {

  // Define your routes using createBrowserRouter
  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <Navbar /> <Dashboard />
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
  ]);

  return (
    <>
      <div className="absolute top-0 z-[-2] min-h-full min-w-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      </div>

      {/* Your government-specific navbar */}
      <Gov_navbar />

      {/* Use RouterProvider to enable routing */}
      <RouterProvider router={router} />

      {/* You can add static elements or a footer if needed */}
      <div className='bg-slate-300'>
        {/* Other content */}
      </div>
      {/* <FeedbackForm /> */}
    </>
  );
}

export default App;

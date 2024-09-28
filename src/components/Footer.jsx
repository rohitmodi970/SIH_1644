import { useEffect, useState } from 'react';

const Footer = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    // Check and increment the visitor count in localStorage
    let count = parseInt(localStorage.getItem('visitCount')) || 0;
    count += 1;
    localStorage.setItem('visitCount', count);
    setVisitCount(count);
  }, []);

  return (
    <footer className="bg-green-900 text-white py-5 text-center mt-auto relative bottom-[-200px]">
      <div className="logo font-bold text-2xl">
                    <span className="text-green-200">&lt;E</span>
                    <span>
                        -COAL
                    </span>
                    <span className="text-black text-3xl">/&gt;</span>
                </div>
      <div className="footer-content">
        <p>&copy; 2024 Coal Mine Carbon Footprint Tracker | All rights reserved.</p>
        <nav>
          <ul className="list-none p-0 mt-2 flex justify-center gap-4">
            <li>
              <a href="#" className="text-white font-bold hover:underline">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="text-white font-bold hover:underline">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="text-white font-bold hover:underline">Contact Us</a>
            </li>
          </ul>
        </nav>
        <div className="mt-4">
          <p>Total Visitors: {visitCount}</p>
        </div>
        <p className="mt-4">Committed to a sustainable future. Let's reduce carbon emissions together!</p>
      </div>
    </footer>
  );
};

export default Footer;

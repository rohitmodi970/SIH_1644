import React, { useState } from 'react';
import Card from './Card';

const Safety = () => {
  const [formData, setFormData] = useState({
    rcmd: '',
    silica: '',
    co_ppm: '',
    ch4_lel: '',
  });

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    fetch('http://localhost:3000/monitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      // fetch('https://sih-1644-5.onrender.com/monitor', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData),
      // })
      .then((response) => response.json())
      .then((result) => {
        setAlerts(result.alerts || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch alerts. Please try again later.');
        setLoading(false);
      });
  };

  const getAlertColorClass = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-100 text-red-800';
      case 'yellow':
        return 'bg-yellow-200 text-yellow-900';
      case 'green':
        return 'bg-green-200 text-green-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col justify-evenly items-center gap-4 text-center w-full max-w-md"
      >
        {/* Input Fields */}
        <div className="w-full">
          <label className="block text-sm font-medium">RCMD:</label>
          <input
            type="number"
            name="rcmd"
            value={formData.rcmd}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
            placeholder="Enter RCMD"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Silica:</label>
          <input
            type="number"
            name="silica"
            value={formData.silica}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
            placeholder="Enter Silica"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">CO (PPM):</label>
          <input
            type="number"
            name="co_ppm"
            value={formData.co_ppm}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
            placeholder="Enter CO (PPM)"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">CH4 (LEL):</label>
          <input
            type="number"
            name="ch4_lel"
            value={formData.ch4_lel}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
            placeholder="Enter CH4 (LEL)"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
        >
          Submit
        </button>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Display the alert cards */}

      <div className="flex justify-center gap-10 items-center">
        {/* Section for safety messages */}
        <div className="mt-8 flex flex-wrap justify-center  h-full gap-6 w-full max-w-screen-lg mx-5">
          {loading ? (
            <p className="text-center text-gray-500 w-full">Loading...</p>
          ) : (
            alerts.map((alert, index) => (
              <Card
                key={index}
                title={`Safety Alert ${index + 1}`}
                content={`${alert.safety_message}`}
                bgColor={getAlertColorClass(alert.alert_color)}
              />
            ))
          )}
        </div>

        {/* Section for preventive measures */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 h-full w-full max-w-screen-lg mx-5">
          {loading ? (
            <p className="text-center text-gray-500 w-full">Loading...</p>
          ) : (
            alerts.map((alert, index) => (
              <Card
                key={index}
                title={`Preventive Measure ${index + 1}`}
                content={`${alert.preventive_measures}`} // Display preventive measures here
                bgColor={getAlertColorClass(alert.alert_color)}
              />
            ))
          )}
        </div>
      </div>


      {/* Background Effect */}
      <div className="fixed top-0 left-0 z-[-2] w-full h-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
    </div>
  );
};

export default Safety;

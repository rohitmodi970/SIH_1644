import React from 'react'
import { useState } from 'react';
import Card from './Card';

const Carboncalculator = () => {

  const [formData, setFormData] = useState({
    rcmd: 2.0,
    silica: 0.1,
    co_ppm: 120,
    ch4_lel: 13,
  });

  const [data, setData] = useState({ safetyMessages: [], preventiveMeasures: [] });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch('http://localhost:3000/monitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        const safetyMessages = result.safety_message.split('\n').filter(msg => msg.trim());
        const preventiveMeasures = result.preventive_measures.split('\n').filter(msg => msg.trim());

        setData({ safetyMessages, preventiveMeasures });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };


  return (
    <>
      <div className=" flex flex-col justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col justify-evenly items-center gap-2 text-center">
          <div>
            <span> RCMD:</span>
            <input type="number" name="rcmd" value={formData.rcmd} onChange={handleInputChange} className="border p-2 rounded-lg" placeholder='Enter RCMD' />
          </div>
          <div>
            <span>Silica:</span>
            <input type="number" name="silica" value={formData.silica} onChange={handleInputChange} className="border p-2 rounded-lg" placeholder='Enter Silica' />
          </div>
          <div>
            <span>CO (PPM):</span>
            <input type="number" name="co_ppm" value={formData.co_ppm} onChange={handleInputChange} className="border p-2 rounded-lg" placeholder='Enter CO (PPM)' />
          </div>
          <div>
            <span>CH4 (LEL):</span>
            <input type="number" name="ch4_lel" value={formData.ch4_lel} onChange={handleInputChange} className="border p-2 rounded-lg" placeholder='Enter CH4 (LEL)' />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </form>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <>
              {/* Safety Alerts Section */}
              {data.safetyMessages.length > 0 && (
                <>
                  <div className="col-span-full">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-2">Safety Alerts</h2>
                  </div>
                  {data.safetyMessages.map((message, index) => (
                    <div key={index} className="bg-slate-300 p-6 rounded-xl shadow-md flex flex-col justify-between min-h-[200px]">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Safety Alert {index + 1}</h3>
                      <p className="text-md text-gray-600">{message}</p>
                    </div>
                  ))}
                </>
              )}

              {/* Preventive Measures Section */}
              {data.preventiveMeasures.length > 0 && (
                <>
                  <div className="col-span-full mt-12">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 pb-2">Preventive Measures</h2>
                  </div>
                  {data.preventiveMeasures.map((measure, index) => (
                    <div key={index} className="bg-slate-300 p-6 rounded-xl shadow-md flex flex-col justify-between min-h-[200px]">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">Preventive Measure {index + 1}</h3>
                      <p className="text-md text-gray-600">{measure}</p>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>

        <div className="fixed top-0 left-0 z-[-2] w-full h-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      </div>
    </>
  )
}

export default Carboncalculator

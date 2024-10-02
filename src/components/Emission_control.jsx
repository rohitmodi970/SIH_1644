import React, { useState } from 'react';
 

const Emission_control = () => {
  const [formData, setFormData] = useState({
    carbon_capture: '',
    solar_panels: '',
    biofuels: '',
    methane_capture: '',
    afforestation: '',
    modernization: '',
    energy_efficiency: '',
    electric_vehicles: ''
  });

  const [isSubmit, setisSubmit] = useState(false)
  const units = [
    '(in tonnes)', 'a number', 'in litres', 'in kg', 'number of trees', 'projects count', 'initiatives count', 'count'
  ];
  
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emissionData = {
      emission_controls: {
        carbon_capture: { quantity: parseFloat(formData.carbon_capture) || 0 },
        solar_panels: { quantity: parseFloat(formData.solar_panels) || 0 },
        biofuels: { quantity: parseFloat(formData.biofuels) || 0 },
        methane_capture: { quantity: parseFloat(formData.methane_capture) || 0 },
        afforestation: { quantity: parseFloat(formData.afforestation) || 0 },
        modernization: { quantity: parseFloat(formData.modernization) || 0 },
        energy_efficiency: { quantity: parseFloat(formData.energy_efficiency) || 0 },
        electric_vehicles: { quantity: parseFloat(formData.electric_vehicles) || 0 }
      }
    };

    try {
      const res = await fetch('https://sih-1644-model.onrender.com/emission_control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emissionData)
      });
      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl mb-4 font-semibold">Enter Emission Control Data</h2>
        {['carbon_capture', 'solar_panels', 'biofuels', 'methane_capture', 'afforestation', 'modernization', 'energy_efficiency', 'electric_vehicles'].map((field, index) => (
          <div className="mb-4 w-full" key={field}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.replace('_', ' ').toUpperCase()}:
            </label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              placeholder={`Enter ${field.replace('_', ' ')} ${units[index]}`}
              required
            />
          </div>
        ))}
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>

      {response && (
        <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-lg w-1/2">
          <h3 className="text-xl font-semibold mb-4">Emission Control Results:</h3>
          <p>Total CO2 Saved (kg): {response.total_co2_saved_kg}</p>
          <p>Carbon Credits Earned: {response.carbon_credits_earned}</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold">Detailed Breakdown:</h4>
            <ul>
              {Object.keys(response.solutions_saved).map((control) => (
                <li key={control} className="mt-2">
                  {response.solutions_saved[control].description} - CO2 Saved: {response.solutions_saved[control].co2_saved_kg} kg ({response.solutions_saved[control].unit})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emission_control;

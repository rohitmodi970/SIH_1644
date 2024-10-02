import React, { useState } from 'react';
import Emission_control from './Emission_control';

const Userinput_emission_control = ({ onSubmit }) => {
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

    const [parsedData, setParsedData] = useState(null);

    // Handle input change and update state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const data = {
            emission_controls: {
                carbon_capture: { quantity: parseFloat(formData.carbon_capture) || 0 },
                solar_panels: { quantity: parseInt(formData.solar_panels, 10) || 0 },
                biofuels: { quantity: parseFloat(formData.biofuels) || 0 },
                methane_capture: { quantity: parseFloat(formData.methane_capture) || 0 },
                afforestation: { quantity: parseInt(formData.afforestation, 10) || 0 },
                modernization: { quantity: parseInt(formData.modernization, 10) || 0 },
                energy_efficiency: { quantity: parseInt(formData.energy_efficiency, 10) || 0 },
                electric_vehicles: { quantity: parseInt(formData.electric_vehicles, 10) || 0 }
            }
        };

        setParsedData(data);
    };

    return (
        <div className="flex justify-center items-center py-36 ">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg w-1/2 transform transition-transform duration-300 hover:scale-105">
                <h2 className="text-2xl mb-4 font-semibold">Enter Emission Control Data</h2>

                {[
                    { key: 'carbon_capture', label: 'Carbon Capture (in tonnes)' },
                    { key: 'solar_panels', label: 'Solar Panels (a number)' },
                    { key: 'biofuels', label: 'Biofuels (in litres)' },
                    { key: 'methane_capture', label: 'Methane Capture (in kg)' },
                    { key: 'afforestation', label: 'Afforestation (number of trees)' },
                    { key: 'modernization', label: 'Modernization (projects count)' },
                    { key: 'energy_efficiency', label: 'Energy Efficiency (initiatives count)' },
                    { key: 'electric_vehicles', label: 'Electric Vehicles (count)' }
                ].map(({ key, label }) => (
                    <div key={key} className="mb-4 w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2">{label}:</label>
                        <input
                            type={key === 'biofuels' || key === 'carbon_capture' || key === 'methane_capture' ? 'text' : 'number'}
                            name={key}
                            value={formData[key]}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder={`Enter ${label}`}
                            required
                        />
                    </div>
                ))}

                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Parse Data
                </button>
            </form>

            {/* Render API Submit Component only after parsing data */}
            {parsedData && <Emission_control formData={parsedData} />}
        </div>
    );
};

export default Userinput_emission_control;

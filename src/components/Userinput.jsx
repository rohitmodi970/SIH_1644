//userinput for carnon emission calculator
import React, { useState } from 'react';

const coalfieldsByState = {
    Chhattisgarh: ['Korba Coalfield', 'Raigarh Coalfield', 'Hasdeo-Arand Coalfield'],
    Jharkhand: ['Jharia Coalfield', 'Giridih Coalfield', 'Ramgarh Coalfield'],
    Madhya_Pradesh: ['Singrauli Coalfield', 'Sohagpur Coalfield', 'Umaria Coalfield'],
    odisha: ['Talcher Coalfield', 'Ib Valley Coalfield', 'Brahmaputra Coalfield'],
    WestBengal: ['Raniganj Coalfield', 'Mugma Coalfield', 'Asansol Coalfield'],
    Maharashtra: ['Wardha Valley Coalfield', 'Nagpur Coalfield', 'Chandrapur Coalfield'],
    Telangana: ['Singareni Coalfield', 'Godavari Valley Coalfield', 'Ramagundam Coalfield'],
    Assam: ['Margherita Coalfield', 'Tikak Coalfield', 'Namchik-Namphuk Coalfield']
};

const Userinput = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        state: '',
        coalfield: '',
        mine_type: '',
        coal_type: '',
        depth: '',
        degree: '',
        coal_mined: '',
        diesel_usage: '',
        electricity_usage: '',
        coal_used_as_fuel: '',
        vehicle_count: ''
    });

    // Handle input change and update state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const isNumericField = ['depth', 'degree', 'coal_mined', 'diesel_usage', 'electricity_usage', 'coal_used_as_fuel', 'vehicle_count'].includes(name);
        setFormData({
            ...formData,
            [name]: isNumericField ? value.replace(/\D/g, '') : value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            ...formData,
            depth: parseInt(formData.depth, 10) || 0,
            degree: parseInt(formData.degree, 10) || 0,
            coal_mined: parseInt(formData.coal_mined, 10) || 0,
            diesel_usage: parseInt(formData.diesel_usage, 10) || 0,
            electricity_usage: parseInt(formData.electricity_usage, 10) || 0,
            coal_used_as_fuel: parseInt(formData.coal_used_as_fuel, 10) || 0,
            vehicle_count: parseInt(formData.vehicle_count, 10) || 0
        };
        onSubmit(dataToSubmit);
    };

    return (
        <div className="flex justify-center items-center py-36 bg-gray-50 rounded-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-white p-8 rounded-xl shadow-lg w-2/3 transform transition-transform duration-300 hover:scale-105">
                <h2 className="text-3xl mb-6 font-semibold text-gray-800">Enter Coal Mining Data</h2>

                {/* State Select */}
                <div className="mb-4 w-full">
                    <label className="block text-lg mb-2 text-gray-700">State</label>
                    <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    >
                        <option value="" disabled>Select State</option>
                        <option value="Assam">Assam</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Madhya_Pradesh">Madhya Pradesh</option>
                        <option value="odisha">Odisha</option>
                        <option value="Telangana">Telangana</option>
                        <option value="WestBengal">West Bengal</option>
                    </select>
                </div>

                {/* Coalfield Select */}
                {formData.state && (
                    <div className="mb-4 w-full">
                        <label className="block text-lg mb-2 text-gray-700">Coalfield</label>
                        <select
                            name="coalfield"
                            value={formData.coalfield}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Select Coalfield</option>
                            {coalfieldsByState[formData.state].map((coalfield) => (
                                <option key={coalfield} value={coalfield}>
                                    {coalfield}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Other form fields */}
                <div className="grid grid-cols-2 gap-4 w-full">
                    <div>
                        <label className="block text-lg mb-2 text-gray-700">Mine Type</label>
                        <select
                            name="mine_type"
                            value={formData.mine_type}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Select Mine Type</option>
                            <option value="open-cast">open-Cast</option>
                            <option value="underground">underground</option>
                            <option value="mixed">mixed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-lg mb-2 text-gray-700">Coal Type</label>
                        <select
                            name="coal_type"
                            value={formData.coal_type}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        >
                            <option value="" disabled>Select Coal Type</option>
                            <option value="Anthracite">Anthracite</option>
                            <option value="Bituminous A">Bituminous A</option>
                            <option value="Bituminous B">Bituminous B</option>
                            <option value="Bituminous C">Bituminous C</option>
                            <option value="Sub-bituminous A">Sub-bituminous A</option>
                            <option value="Sub-bituminous B">Sub-bituminous B</option>
                            <option value="Sub-bituminous C">Sub-bituminous C</option>
                            <option value="Lignite">Lignite</option>
                            <option value="Peat">Peat</option>
                        </select>
                    </div>

                    {/* Numeric fields */}
                    {['depth', 'degree', 'coal_mined', 'diesel_usage', 'electricity_usage', 'coal_used_as_fuel', 'vehicle_count'].map((key) => (
                        <div key={key}>
                            <label className="block text-lg mb-2 text-gray-700 capitalize">{key.replace('_', ' ')}</label>
                            <input
                                type="number"
                                name={key}
                                value={formData[key]}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder={`Enter ${key.replace('_', ' ')}`}
                                required
                            />
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="mt-6 px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:ring-4 focus:ring-green-300"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Userinput;

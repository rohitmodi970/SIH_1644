import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Userinput = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        depth: '',
        degree: '',
        coal_mined: '',
        coal_type: '',
        mine_type: '',
        diesel_usage: '',
        electricity_usage: '',
        coal_used_as_fuel: '',
        vehicle_count: ''
    });

    // Handle input change and update state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Check if the field is one of the numeric inputs
        const isNumericField = ['depth', 'degree', 'coal_mined', 'diesel_usage', 'electricity_usage', 'coal_used_as_fuel', 'vehicle_count'].includes(name);
        setFormData({
            ...formData,
            [name]: isNumericField ? value.replace(/\D/g, '') : value // Allow only digits for numeric fields
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        // Convert numeric fields to integers
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
        onSubmit(dataToSubmit); // Pass form data to the parent component
    };

    return (
        <>
            <div className="flex justify-center items-center py-36 ">
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg w-1/2">
                    <h2 className="text-2xl mb-4 font-semibold">Enter Coal Mining Data</h2>

                    {Object.keys(formData).map((key) => (
                        <div key={key} className="mb-4">

                            <TextField id="outlined-basic" label={key} variant="outlined" type={['coal_type', 'mine_type'].includes(key) ? 'text' : 'number'} name={key} value={formData[key]} onChange={handleInputChange} required />
                        </div>
                    ))}
                    <Button  type="submit"  variant="contained" color="success" > Submit </Button>
                </form>
            </div>
        </>
    );
};

export default Userinput;

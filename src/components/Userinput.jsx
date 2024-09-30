import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Userinput = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
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
        <div className="flex justify-center items-center py-36">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg w-1/2">
                <h2 className="text-2xl mb-4 font-semibold">Enter Coal Mining Data</h2>

                {Object.keys(formData).map((key) => (
                    <div key={key} className="mb-4">
                        {key === 'coal_type' ? (
                            <Select
                                label="Coal Type"
                                name="coal_type"
                                value={formData.coal_type}
                                onChange={handleInputChange}
                                displayEmpty
                                fullWidth
                                required
                            >
                                <MenuItem value="" disabled>Select Coal Type</MenuItem>
                                <MenuItem value="Anthracite">Anthracite</MenuItem>
                                <MenuItem value="Bituminous">Peat</MenuItem>
                                <MenuItem value="Sub-bituminous A">Sub-bituminous A</MenuItem>
                                <MenuItem value="Sub-bituminous B">Sub-bituminous B</MenuItem>
                                <MenuItem value="Sub-bituminous C">Sub-bituminous C</MenuItem>
                                <MenuItem value="Sub-bituminous A">Bituminous A</MenuItem>
                                <MenuItem value="Sub-bituminous B">Bituminous B</MenuItem>
                                <MenuItem value="Sub-bituminous C">Bituminous C</MenuItem>
                                <MenuItem value="Lignite">Lignite</MenuItem>
                            </Select>
                        ) : key === 'mine_type' ? (
                            <Select
                                className=''
                                label="Mine Type"
                                name="mine_type"
                                value={formData.mine_type}
                                onChange={handleInputChange}
                                displayEmpty
                                fullWidth
                                required
                            >
                                <MenuItem value="" disabled>Select Mine Type</MenuItem>
                                <MenuItem value="open-cast">open-cast</MenuItem>
                                <MenuItem value="underground">underground</MenuItem>
                            </Select>
                        ) : (
                            <TextField
                                id="outlined-basic"
                                label={key}
                                variant="outlined"
                                type={['coal_type', 'mine_type'].includes(key) ? 'text' : 'number'}
                                placeholder='Enter'
                                name={key}
                                value={formData[key]}
                                onChange={handleInputChange}
                                required
                                fullWidth
                            />
                        )}
                    </div>
                ))}

                <Button type="submit" variant="contained" color="success">
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default Userinput;

import React, { useState } from 'react';
import Userinput from './Userinput';
import DynamicCard from './DynamicCard';
import axios from 'axios';
import Button from '@mui/material/Button';

const Carbonemission = () => {
    const [data, setData] = useState(null); // Holds API data
    const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission

    // Function to handle form submission and API call
    const handleFormSubmit = async (formData) => {
        try {
            const response = await axios.post('https://sih-1644-model.onrender.com/predict', formData); // Call Flask API
            setData(response.data); // Set the data received from the Flask API
            console.log(response.data);
            setFormSubmitted(true); // Update state to indicate form has been submitted
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to reset the form
    const resetForm = () => {
        setData(null);
        setFormSubmitted(false);
    };

    return (
        <div className="container mx-auto p-4 rounded-3xl">
            {/* Conditional rendering: show form or dynamic card */}
            {!formSubmitted ? (
                <Userinput onSubmit={handleFormSubmit} />
            ) : (
                <div>
                    <div className="flex flex-wrap gap-4">
                        <DynamicCard title="Carbon" data={data?.prediction_co2 || "N/A"} />
                        <DynamicCard title="Methane" data={data?.prediction_ch4 || "N/A"} />
                        <DynamicCard title="Total Carbon Footprint" data={data?.total_carbon_footprints?.toFixed(2) || "N/A"} />
                        <DynamicCard title="Other Gas Emissions" data={data?.other_gases_emissions?.toFixed(2) || "N/A"} />
                        <DynamicCard title="Area for Tree Plantation (hectares)" data={data?.trees_area_in_hectares?.toFixed(2) || "N/A"} />
                        <DynamicCard title="Trees Needed" data={data?.trees_needed?.toFixed(0) || "N/A"} />
                        <DynamicCard title="Impact" data={data?.impact || "N/A"} />
                    </div>

                    <DynamicCard title="Possible Solutions" data={Array.isArray(data?.possible_solutions) ? data.possible_solutions.join(', ') : data?.possible_solutions || "N/A"} />

                    {/* Button to submit another form */}
                    <Button
                        onClick={resetForm}
                        variant="contained"
                        color="success"
                    >
                        Submit Another
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Carbonemission;

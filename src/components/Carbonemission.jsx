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
        <div className="container mx-auto p-6 rounded-3xl bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
            {/* Conditional rendering: show form or dynamic card */}
            {!formSubmitted ? (
                <Userinput onSubmit={handleFormSubmit} />
            ) : (
                <div>
                    {/* Display dynamic cards in a responsive grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <DynamicCard title="Carbon Emission (kg)" data={data?.prediction_co2?.toFixed(2) || "N/A"} />
                        <DynamicCard title="Methane Emission (kg)" data={data?.prediction_ch4?.toFixed(2) || "N/A"} />
                        <DynamicCard title="Total Carbon Footprint (kg)" data={data?.total_carbon_footprints?.toFixed(2) || "N/A"} />
                        <DynamicCard title="Other Gas Emissions (kg)" data={data?.other_gases_emissions?.toFixed(2) || "N/A"} />
                        <DynamicCard title="Area for Tree Plantation (hectares)" data={data?.trees_area_in_hectares?.toFixed(2) || "N/A"} />
                        <DynamicCard title="Trees Needed" data={data?.trees_needed?.toFixed(0) || "N/A"} />
                        <DynamicCard title="Trees Needed After Absorption" data={data?.trees_needed_after_absorption?.toFixed(0) || "N/A"} />
                        <DynamicCard title="Area Covered After Absorption (hectares)" data={data?.area_covered_after_absorption?.toFixed(2) || "N/A"} />
                        <DynamicCard title="Region CO₂ Absorbed (kg)" data={data?.region_co2_absorbed?.toFixed(2) || "N/A"} />
                        <DynamicCard title="Excess Emissions (kg)" data={data?.excess_emissions?.toFixed(2) || "N/A"} />
                        <DynamicCard title="Emissions Alert" data={data?.emmision_alert || "N/A"} />
                        <DynamicCard title="Impact" data={data?.impact || "N/A"} isHtml={true} />
                    </div>

                    {/* Display possible solutions */}
                    <DynamicCard
                        title="Possible Solutions"
                        data={Array.isArray(data?.possible_solutions) ? data.possible_solutions.join(', ') : data?.possible_solutions || "N/A"}
                        isHtml={true}
                    />

                    {/* Display recommendations if available */}
                    <DynamicCard
                        title="Recommendations"
                        data={Array.isArray(data?.recommendations) ? data.recommendations.join(', ') : data?.recommendations || "N/A"}
                        isHtml={true}
                    />

                    {/* Button to submit another form */}
                    <div className="mt-6 flex justify-center">
                        <Button onClick={resetForm} variant="contained" color="success">
                            Submit Another
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carbonemission;

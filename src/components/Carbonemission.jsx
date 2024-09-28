
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
            const response = await axios.post('http://127.0.0.1:5000/predict', formData); // Call Flask API
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
        <>
            <div className="container mx-auto p-4 bg-slate-200 rounded-3xl">
                {/* Conditional rendering: show form or dynamic card */}
                {!formSubmitted ? (
                    <Userinput onSubmit={handleFormSubmit} />
                ) : (
                    <div className=''>
                        {/* Dynamic Cards */}
                        <div className="flex ">
                            <div className="w-full ">
                                <DynamicCard title="Carbon" data={data.prediction_co2} />
                            </div>
                            <div className="w-full">
                                <DynamicCard title="Methane" data={data.prediction_ch4} />
                            </div>
                            <div className="w-full">
                                <DynamicCard title="total Carbon Footprint" data={(data.total_carbon_footprints).toFixed(2)} />
                            </div>
                        </div>
                            <div className="flex ">
                            <div className="w-full">

                            <DynamicCard title="Other gas emission" data={(data.other_gases_emissions).toFixed(2)} />
                            </div>
                            <div className="w-full">
                            <DynamicCard title="Area required in hectare for tree plantation" data={(data.trees_area_in_hectares).toFixed(2)} />
                            </div>
                            <div className="w-full">
                            <DynamicCard title="Tree Needed" data={(data.trees_needed).toFixed(0)} />

                            </div>
                            </div>
                        <div className=" ">


                            <DynamicCard title="Impact" data={data.impact} />
                            <DynamicCard title="Possible solutions" data={data.possible_solutions} />

                        </div>
                        {/* Button to submit another form */}
                        <Button
                            onClick={resetForm}
                            variant="contained" color="success"
                        >
                            Submit Another
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Carbonemission;

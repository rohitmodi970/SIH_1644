import React, { useState } from 'react';
import Userinput_emission_control from './Userinput_emission_control'; // Assuming you have a Userinput_emission_control component

// Function to handle API submission
const Emission_control = () => {
    const [formData, setFormData] = useState({}); // State to hold form data
    const [formSubmitted, setFormSubmitted] = useState(false); // Track if the form is submitted
    const [apiResponse, setApiResponse] = useState(null); // State to hold API response data

    // Handler to submit the form
    const handleFormSubmit = (submittedData) => {
        setFormData(submittedData); // Update state with submitted data
        setFormSubmitted(true); // Indicate that the form has been submitted
    };

    // Function to handle API submission
    const handleApiSubmit = async () => {
        try {
            const response = await fetch('https://sih-1644-model.onrender.com/emission_control', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setApiResponse(data); // Store the API response in state
                alert('Form submitted successfully');
            } else {
                alert('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form. Please check your network connection.');
        }
    };

    return (
        <div>
            {/* Conditional rendering: show form or submission button */}
            {!formSubmitted ? (
                <Userinput_emission_control onSubmit={handleFormSubmit} /> // Pass handleFormSubmit to Userinput_emission_control
            ) : (
                <div className="flex justify-center items-center py-6">
                    <button
                        onClick={handleApiSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit to API
                    </button>
                </div>
            )}

            {/* Display API response data if available */}
            {apiResponse && (
                <div className="mt-6">
                    <h2 className="text-xl font-bold">API Response</h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <p><strong>Total CO2 Saved (kg):</strong> {apiResponse.total_co2_saved_kg}</p>
                        <p><strong>Carbon Credits Earned:</strong> {apiResponse.carbon_credits_earned}</p>
                        <p><strong>Solutions Saved:</strong> {apiResponse.solutions_saved}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Emission_control;

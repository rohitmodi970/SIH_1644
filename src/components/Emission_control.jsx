import React, { useState } from 'react';
import Userinput_emission_control from './Userinput_emission_control';  // Assuming you have a Userinput_emission_control component


// Function to handle API submission
const Emission_control = ({ formData }) => {
    const [formSubmitted, setFormSubmitted] = useState(false);  // Moved inside the component

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
                alert('Form submitted successfully: ' + JSON.stringify(data));
            } else {
                alert('Failed to submit the form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting form. Please check your network connection.');
        }
    };

    // Handler to submit the form
    const handleFormSubmit = (submittedData) => {
        setFormSubmitted(true);
        // You can also set the formData if necessary, e.g., setFormData(submittedData);
    };

    return (
        <div>
            {/* Conditional rendering: show form or submission button */}
            {!formSubmitted ? (
                <Userinput_emission_control onSubmit={handleFormSubmit} />  // Pass handleFormSubmit to Userinput_emission_control
            ) : (
                <div className="flex justify-center items-center py-6">
                    <button
                        onClick={handleApiSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit to API
                    </button>
                </div>
            )}
        </div>
    );
};

export default Emission_control;

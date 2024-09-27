import React, { useState } from 'react';

const FeedbackForm = () => {
  const [activeOption, setActiveOption] = useState('');
  const [rating, setRating] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-gray-100">
      {submitted ? (
        <div className="text-center animate-fadeIn">
          <h1 className="text-3xl font-bold mb-4 text-green-600">Thank You for Your Feedback!</h1>
          <p className="text-gray-600">We appreciate your input and will use it to improve our services.</p>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full animate-fadeIn">
          <h1 className="text-center text-2xl font-bold mb-6 text-gray-700">We Value Your Feedback</h1>

          <div className="rating flex justify-center items-center mb-6">
            {[1,2,3,4,5].map((star) => (
              <label key={star} className={`cursor-pointer text-4xl transition ${rating >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}>
                ★
                <input
                  type="radio"
                  name="usability"
                  value={star}
                  className="hidden"
                  onChange={handleRatingChange}
                />
              </label>
            ))}
          </div>

          <p className="text-center text-gray-600 mb-4">How can we improve?</p>

          <div className="feedback-options grid grid-cols-1 gap-2 mb-6">
            {['User Experience Feedback', 'Carbon Footprint Calculation', 'Methane Emissions as Energy Source', 'Coal Fire Detection and Prevention', 'General Feedback'].map(option => (
              <div
                key={option}
                className={`cursor-pointer py-3 px-4 rounded-lg text-center transition ${activeOption === option ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>

          <textarea
            className="w-full h-28 p-3 border border-gray-300 rounded-lg resize-none focus:border-green-500 focus:ring-green-500 transition mb-4"
            placeholder="Other suggestions..."
          />

          <button
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition font-semibold"
            onClick={handleSubmit}
          >
            Submit Feedback
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;

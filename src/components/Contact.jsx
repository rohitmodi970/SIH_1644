import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
    // Handle form submission logic here
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Contact Us</h1>

      <div className="mb-6">
        <p className="text-lg text-gray-600 text-center">
          We’d Love to Hear from You!
        </p>
        <p className="text-center text-gray-600">
          Have questions, feedback, or need assistance? Our team is here to help. Let’s work together towards a sustainable future for Indian coal mines.
        </p>
      </div>

      <div className="bg-gray-100 p-6 rounded-md shadow-lg mb-6">
        <h2 className="text-xl text-blue-500 font-semibold mb-4">Contact Information</h2>
        <p><strong>Email:</strong> support@gmail.com</p>
        <p><strong>Phone:</strong> +91-7889234789</p>
        <p><strong>Address:</strong><br />
          [Your Company Name]<br />
          [Street Address]<br />
          [City, State, Zip Code]<br />
          India
        </p>
      </div>

      <div className="bg-gray-100 p-6 rounded-md shadow-lg mb-6">
        <h2 className="text-xl text-blue-500 font-semibold mb-4">General Inquiries</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block mb-2">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />

          <label htmlFor="email" className="block mb-2">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />

          <label htmlFor="subject" className="block mb-2">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />

          <label htmlFor="message" className="block mb-2">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 mb-4"
            required
          ></textarea>

          <input
            type="submit"
            value="Send Message"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 cursor-pointer"
          />
        </form>
      </div>

      <div className="bg-gray-100 p-6 rounded-md shadow-lg mb-6">
        <h2 className="text-xl text-blue-500 font-semibold mb-4">Follow Us</h2>
        <p>Stay connected and follow our journey towards carbon neutrality:</p>
        <p>
          <NavLink to="#" className="text-blue-500 hover:underline">LinkedIn</NavLink> | 
          <NavLink to="#" className="text-blue-500 hover:underline"> Twitter</NavLink> | 
          <NavLink to="#" className="text-blue-500 hover:underline"> Facebook</NavLink>
        </p>
      </div>

      <div className="bg-gray-100 p-6 rounded-md shadow-lg mb-6">
        <h2 className="text-xl text-blue-500 font-semibold mb-4">Frequently Asked Questions</h2>
        <p>Check out our <NavLink to="/faq" className="text-blue-500 hover:underline">FAQ page</NavLink> for quick answers to common queries about our application.</p>
      </div>

      <footer className="text-center text-gray-600 text-sm mt-6">
        <p>Thank you for reaching out! We value your input and will get back to you as soon as possible.</p>
      </footer>
    </div>
  );
};

export default ContactUs;

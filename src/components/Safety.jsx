import React, { useState, useEffect } from 'react';
import Card from './Card';
import { v4 as uuidv4 } from 'uuid';

const Safety = () => {
  const [formData, setFormData] = useState({
    rcmd: '',
    silica: '',
    co_ppm: '',
    ch4_lel: '',
  });
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCards, setShowCards] = useState(false);

  // Load alerts from localStorage on component mount
  // Load alerts and form data from localStorage on component mount
useEffect(() => {
  const savedAlerts = localStorage.getItem('datas');
  const savedFormData = localStorage.getItem('formData');  // Added this

  if (savedAlerts) {
    setAlerts(JSON.parse(savedAlerts));
  }
  
  // If form data is found, set it to the state
  if (savedFormData) {
    setFormData(JSON.parse(savedFormData));  // Added this
  }
}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    // Validate form data
    if (formData.rcmd && formData.silica && formData.co_ppm && formData.ch4_lel) {
      // Create a new alert with a unique ID
      const newAlert = { ...formData, id: uuidv4() };
  
      // Save the new alert to local state
      const updatedAlerts = [...alerts, newAlert];
      setAlerts(updatedAlerts);
  
      // Save to localStorage
      localStorage.setItem('datas', JSON.stringify(updatedAlerts));
  
      // Reset the form fields
      // setFormData({ rcmd: '', silica: '', co_ppm: '', ch4_lel: '' });
  
      // Submit the new alert to the server
      try {
        const response = await fetch('https://sih-1644-5.onrender.com/monitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAlert), // Send the new alert with the correct ID
        });
  
        // Parse the response
        const result = await response.json();
  
        if (response.ok) {
          // Update the alerts state with the result from the server, if necessary
          setAlerts(result.alerts || []);
          setShowCards(true); // Show cards after form submission
        } else {
          throw new Error(result.message || 'Failed to submit alert.');
        }
      } catch (error) {
        console.error('Error submitting data:', error);
        setError('Failed to submit alert. Please try again later.');
      } finally {
        setLoading(false); // Stop loading after the process is done
      }
    } else {
      // Validation failed, show an alert
      alert('Please fill in all fields before submitting.');
      setLoading(false);
    }
  };
  
  const saveData = () => {
    if (formData.rcmd && formData.silica && formData.co_ppm && formData.ch4_lel) {
      const newAlert = { ...formData, id: uuidv4() };

      // Save data to localStorage
      const updatedAlerts = [...alerts, newAlert];
      setAlerts(updatedAlerts);
      localStorage.setItem('savedFormData', JSON.stringify(updatedAlerts));

      // Reset form
      setFormData({ rcmd: '', silica: '', co_ppm: '', ch4_lel: '' });
    } else {
      alert('Please fill in all fields before saving.');
    }
  };

  const deleteData = (id) => {
    const confirmDel = confirm('Are you sure you want to delete this data?');
    if (confirmDel) {
      const updatedAlerts = alerts.filter((item) => item.id !== id);
      setAlerts(updatedAlerts);
      localStorage.setItem('datas', JSON.stringify(updatedAlerts)); // update localStorage
    }
  };

  const editData = (id) => {
    const dataToEdit = alerts.find((item) => item.id === id);
    if (dataToEdit) {
      setFormData({
        rcmd: parseFloat(dataToEdit.rcmd),
        silica: parseFloat(dataToEdit.silica),
        co_ppm: parseFloat(dataToEdit.co_ppm),
        ch4_lel: parseFloat(dataToEdit.ch4_lel)
      });
      const updatedAlerts = alerts.filter((item) => item.id !== id);
      setAlerts(updatedAlerts);
    }
  };

  const getAlertColorClass = (color) => {
    switch (color) {
      case 'red':
        return 'bg-red-100 text-red-800';
      case 'yellow':
        return 'bg-yellow-200 text-yellow-900';
      case 'green':
        return 'bg-green-200 text-green-800';
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col justify-evenly items-center gap-4 text-center w-full max-w-md"
      >
        {/* Input Fields */}
        <div className="w-full">
          <label className="block text-sm font-medium">RCMD:</label>
          <input
            type="number"
            name="rcmd"
            value={formData.rcmd}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
            placeholder="Enter RCMD"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">Silica:</label>
          <input
            type="number"
            name="silica"
            value={formData.silica}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
            placeholder="Enter Silica"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">CO (PPM):</label>
          <input
            type="number"
            name="co_ppm"
            value={formData.co_ppm}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
            placeholder="Enter CO (PPM)"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium">CH4 (LEL):</label>
          <input
            type="number"
            name="ch4_lel"
            value={formData.ch4_lel}
            onChange={handleInputChange}
            className="border p-2 rounded-lg w-full"
            placeholder="Enter CH4 (LEL)"
            required
          />
        </div>
        <div className="flex w-full gap-3">

        <button

          type="submit"
          className="bg-green-500 text-white p-2 rounded-lg w-full"
        >
          Submit
        </button>
        <button
        onClick={saveData}
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg w-full"
        >
          Save Data
        </button>
        </div>
      </form>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {showCards ? (
        <div className="flex justify-center gap-10 items-center">
          <div className="mt-8 flex flex-wrap justify-center h-full gap-6 w-full max-w-screen-lg mx-5">
            {loading ? (
              <p className="text-center text-gray-500 w-full">Loading...</p>
            ) : (
              alerts.map((alert, index) => (
                <Card
                  key={alert.id}
                  title={`Safety Alert ${index + 1}`}
                  content={`${alert.safety_message}`}
                  bgColor={getAlertColorClass(alert.alert_color)}
                />
              ))
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 h-full w-full max-w-screen-lg mx-5">
            {loading ? (
              <p className="text-center text-gray-500 w-full">Loading...</p>
            ) : (
              alerts.map((alert, index) => (
                <Card
                  key={alert.id}
                  title={`Preventive Measure ${index + 1}`}
                  content={`${alert.preventive_measures}`}
                  bgColor={getAlertColorClass(alert.alert_color)}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="data">
          <h2 className="font-bold text-center text-2xl py-4">Saved Data</h2>
          {alerts.length > 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-14">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">RCMD</th>
                  <th className="py-2">SILICA</th>
                  <th className="py-2">CO (PPM)</th>
                  <th className="py-2">CH4 (LEL)</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert.id} className="text-center">
                    <td className="w-[20vw] border-2 border-white">{alert.rcmd}</td>
                    <td className="w-[20vw] border-2 border-white">{alert.silica}</td>
                    <td className="w-[20vw] border-2 border-white">{alert.co_ppm}</td>
                    <td className="w-[20vw] border-2 border-white">{alert.ch4_lel}</td>
                    <td className="text-center py-3 border border-white w-[15vw]">
                      <span className="cursor-pointer mx-1" onClick={() => editData(alert.id)}>
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px", paddingTop: "4px", paddingLeft: "4px" }}
                        />
                      </span>
                      <span className="cursor-pointer mx-1" onClick={() => deleteData(alert.id)}>
                        <lord-icon
                          src="https://cdn.lordicon.com/kfzfxczd.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px", paddingTop: "4px", paddingLeft: "4px" }}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Safety;

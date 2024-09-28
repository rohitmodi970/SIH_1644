// import React, { useState, useEffect } from "react";
// import Card from "./Card";
// const DynamicCard = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Simulate API call
//     setTimeout(() => {
//       setData({ percentage: "28%", target: "Reduction Target" });
//     }, 100);
//   }, []);

//   return (
//     <div>
//       {data ? (
//         <Card title="Dynamic Footprint" percentage={data.percentage}>
//           <p>{data.target}</p>
//         </Card>
//       ) : (
//         <p className="text-center text-gray-500">Loading...</p>
//       )}
//     </div>
//   );
// };

// export default DynamicCard;

// import React, { useState } from "react";
// import Card from "./Card";

// const DynamicCard = () => {
//   const [formData, setFormData] = useState({
//     rcmd: 2.0,
//     silica: 0.1,
//     co_ppm: 120,
//     ch4_lel: 13,
//   });

//   const [data, setData] = useState({ safetyMessages: [], preventiveMeasures: [] });
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: parseFloat(value) });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Fetch data from the backend API with user input values
//     fetch('http://localhost:3000/monitor', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         // Split safety messages and preventive measures by sections and store them separately
//         const safetyMessages = result.safety_message.split('\n').filter(msg => msg.trim());
//         const preventiveMeasures = result.preventive_measures.split('\n').filter(msg => msg.trim());

//         setData({ safetyMessages, preventiveMeasures });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="p-4">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label>RCMD:</label>
//           <input
//             type="number"
//             name="rcmd"
//             value={formData.rcmd}
//             onChange={handleInputChange}
//             className="border p-2"
//           />
//         </div>
//         <div>
//           <label>Silica:</label>
//           <input
//             type="number"
//             name="silica"
//             value={formData.silica}
//             onChange={handleInputChange}
//             className="border p-2"
//           />
//         </div>
//         <div>
//           <label>CO (PPM):</label>
//           <input
//             type="number"
//             name="co_ppm"
//             value={formData.co_ppm}
//             onChange={handleInputChange}
//             className="border p-2"
//           />
//         </div>
//         <div>
//           <label>CH4 (LEL):</label>
//           <input
//             type="number"
//             name="ch4_lel"
//             value={formData.ch4_lel}
//             onChange={handleInputChange}
//             className="border p-2"
//           />
//         </div>
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Submit
//         </button>
//       </form>

//       <div className="mt-8 space-y-4">
//         {loading ? (
//           <p className="text-center text-gray-500">Loading...</p>
//         ) : (
//           <>
//             {data.safetyMessages.length > 0 && (
//               <>
//                 <h2 className="text-xl font-semibold text-gray-700">Safety Alerts:</h2>
//                 {data.safetyMessages.map((message, index) => (
//                   <Card key={index} title={`Safety Alert ${index + 1}`} content={message} />
//                 ))}
//               </>
//             )}

//             {data.preventiveMeasures.length > 0 && (
//               <>
//                 <h2 className="text-xl font-semibold text-gray-700">Preventive Measures:</h2>
//                 <div className="">

//                 {data.preventiveMeasures.map((measure, index) => (
//                   <Card key={index} title={`Preventive Measure ${index + 1}`} content={measure} />
//                 ))}
//                 </div>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DynamicCard;
// import React, { useState } from "react";
// import Card from "./Card";

// const DynamicCard = () => {
//   const [formData, setFormData] = useState({
//     rcmd: 2.0,
//     silica: 0.1,
//     co_ppm: 120,
//     ch4_lel: 13,
//   });

//   const [data, setData] = useState({ safetyMessages: [], preventiveMeasures: [] });
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: parseFloat(value) });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Fetch data from the backend API with user input values
//     fetch('http://localhost:3000/monitor', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then((response) => response.json())
//       .then((result) => {
//         const safetyMessages = result.safety_message.split('\n').filter(msg => msg.trim());
//         const preventiveMeasures = result.preventive_measures.split('\n').filter(msg => msg.trim());

//         setData({ safetyMessages, preventiveMeasures });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   };

//   return (
//     <div className="p-4 w-full max-w-screen-lg mx-auto">
//       <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-4">
//         <div>
//           <label>RCMD:</label>
//           <input
//             type="number"
//             name="rcmd"
//             value={formData.rcmd}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//           />
//         </div>
//         <div>
//           <label>Silica:</label>
//           <input
//             type="number"
//             name="silica"
//             value={formData.silica}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//           />
//         </div>
//         <div>
//           <label>CO (PPM):</label>
//           <input
//             type="number"
//             name="co_ppm"
//             value={formData.co_ppm}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//           />
//         </div>
//         <div>
//           <label>CH4 (LEL):</label>
//           <input
//             type="number"
//             name="ch4_lel"
//             value={formData.ch4_lel}
//             onChange={handleInputChange}
//             className="border p-2 w-full"
//           />
//         </div>
//         <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded w-full">
//           Submit
//         </button>
//       </form>

//       <div className="mt-8 grid grid-cols-2 gap-4">
//         {loading ? (
//           <p className="text-center text-gray-500 col-span-2">Loading...</p>
//         ) : (
//           <>
//             {data.safetyMessages.length > 0 && (
//               <>
//                 <h2 className="text-xl font-semibold text-gray-700 col-span-2">Safety Alerts:</h2>
//                 {data.safetyMessages.map((message, index) => (
//                   <Card key={index} title={`Safety Alert ${index + 1}`} content={message} />
//                 ))}
//               </>
//             )}

//             {data.preventiveMeasures.length > 0 && (
//               <>
//                 <h2 className="text-xl font-semibold text-gray-700 col-span-2">Preventive Measures:</h2>
//                 {data.preventiveMeasures.map((measure, index) => (
//                   <Card key={index} title={`Preventive Measure ${index + 1}`} content={measure} />
//                 ))}
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DynamicCard;
import React, { useState } from "react";
import Card from "./Card";

const DynamicCard = () => {
  const [formData, setFormData] = useState({
    rcmd: 2.0,
    silica: 0.1,
    co_ppm: 120,
    ch4_lel: 13,
  });

  const [data, setData] = useState({ safetyMessages: [], preventiveMeasures: [] });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseFloat(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch('http://localhost:3000/monitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((result) => {
        const safetyMessages = result.safety_message.split('\n').filter(msg => msg.trim());
        const preventiveMeasures = result.preventive_measures.split('\n').filter(msg => msg.trim());

        setData({ safetyMessages, preventiveMeasures });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <>
            {data.safetyMessages.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-gray-700 col-span-full">Safety Alerts:</h2>
                {data.safetyMessages.map((message, index) => (
                  <Card key={index} title={`Safety Alert ${index + 1}`} content={message} />
                ))}
              </>
            )}
            {data.preventiveMeasures.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-gray-700 col-span-full">Preventive Measures:</h2>
                {data.preventiveMeasures.map((measure, index) => (
                  <Card key={index} title={`Preventive Measure ${index + 1}`} content={measure} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DynamicCard;

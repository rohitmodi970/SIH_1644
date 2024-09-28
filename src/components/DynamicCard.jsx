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
import React, { useState, useEffect } from "react";
import Card from "./Card";

const DynamicCard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the backend API
    fetch('http://localhost:3000/monitor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rcmd: 2.0,
        silica: 0.1,
        co_ppm: 120,
        ch4_lel: 13,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Set the data retrieved from the backend
        setData({ percentage: result.safety_message, target: result.preventive_measures });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {data ? (
        <Card title="Dynamic Footprint" percentage={data.percentage}>
          <p>{data.target}</p>
        </Card>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default DynamicCard;

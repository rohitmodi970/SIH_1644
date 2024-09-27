import React, { useState, useEffect } from "react";
import Card from "./Card";
const DynamicCard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData({ percentage: "28%", target: "Reduction Target" });
    }, 1000);
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

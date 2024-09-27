import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "CO2", value: 70 },
  { name: "Methane", value: 20 },
  { name: "Nitrous Oxide", value: 10 },
];

const COLORS = ["#34D399", "#FBBF24", "#F87171"]; // Green, Yellow, Red

const GreenhouseGasesPieChart = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ paddingLeft: 20 }}
          />
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={{ backgroundColor: "#fff", border: "none" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GreenhouseGasesPieChart;

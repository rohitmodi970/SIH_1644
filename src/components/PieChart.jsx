import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ data }) => {
  // Log the GHG data for debugging
  console.log('CO2:', data.CO2);
  console.log('CH4:', data.CH4);
  console.log('Other GHGs:', data.other_GHGs);

  const chartData = {
    labels: ['CO2', 'CH4', 'Other GHGs'],
    datasets: [
      {
        label: 'Total GHG Emissions',
        data: [
          data.CO2,
          data.CH4,
          data.other_GHGs > 0 ? data.other_GHGs : 0,  // Ensure other_GHGs has a value
        ],
        backgroundColor: ['#4e79a7', '#f28e2b', '#e15759'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total Greenhouse Gas Emissions',
        font: { size: 16, weight: 'bold' },
      },
      legend: {
        position: 'top',
        labels: { font: { size: 12 } },
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;

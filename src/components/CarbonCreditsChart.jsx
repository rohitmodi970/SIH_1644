// src/components/CarbonCreditsChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CarbonCreditsChart = ({ credits }) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Carbon Credits Earned',
        data: credits,
        backgroundColor: 'purple',
        borderColor: 'purple',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Carbon Credits Earned Over the Year',
        font: { size: 16, weight: 'bold' },
      },
      legend: {
        position: 'top',
        labels: { font: { size: 12 } },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Carbon Credits',
          font: { size: 12 },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default CarbonCreditsChart;

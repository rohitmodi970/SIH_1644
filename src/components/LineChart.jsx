// src/components/LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data, height = 400 }) => {
  const chartData = {
    labels: data.month,
    datasets: [
      {
        label: 'CO2 Emissions (kilo tonnes)',
        data: data.CO2,
        borderColor: 'royalblue',
        backgroundColor: 'rgba(65, 105, 225, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'CH4 Emissions (kilo tonnes)',
        data: data.CH4.map((value) => value * 12),
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Total GHGs (kilo tonnes)',
        data: data.TotalGHGs,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 128, 0, 0.2)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { size: 12 } },
      },
      title: {
        display: true,
        text: 'Monthly Greenhouse Gas Emissions',
        font: { size: 18, weight: 'bold' },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
          font: { size: 12 },
        },
        ticks: { maxRotation: 45, minRotation: 45 },
      },
      y: {
        title: {
          display: true,
          text: 'Emissions (in kilotonne)',
          font: { size: 12 },
        },
      },
    },
  };

  return (
    <div style={{ height: height }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;

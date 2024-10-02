// src/components/LineChart.js
import React from 'react';
import PropTypes from 'prop-types';
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
  // Validate incoming data
  const isValidData = data && Array.isArray(data.month) && Array.isArray(data.CO2) && Array.isArray(data.CH4);

  // Calculate Total GHGs if not provided
  const totalGHGs = isValidData
    ? data.CO2.map((co2, index) => co2 + data.CH4[index] * 12)
    : [];

  const chartData = {
    labels: isValidData ? data.month : [],
    datasets: [
      {
        label: 'CO2 Emissions (kilo tonnes)',
        data: isValidData ? data.CO2 : [],
        borderColor: 'royalblue',
        backgroundColor: 'rgba(65, 105, 225, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'CH4 Emissions (kilo tonnes)',
        data: isValidData ? data.CH4.map((value) => value * 12) : [],
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Total GHGs (kilo tonnes)',
        data: totalGHGs,
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

// PropTypes for better prop validation
LineChart.propTypes = {
  data: PropTypes.shape({
    month: PropTypes.arrayOf(PropTypes.string).isRequired,
    CO2: PropTypes.arrayOf(PropTypes.number).isRequired,
    CH4: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  height: PropTypes.number,
};

export default LineChart;

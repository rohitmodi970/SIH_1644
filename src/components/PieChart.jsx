// src/components/PieChart.js
import React from 'react';
import PropTypes from 'prop-types';
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
  // Validate data to prevent errors
  const isValidData = data && typeof data.CO2 === 'number' && typeof data.CH4 === 'number' && typeof data.other_GHGs === 'number';
  
  // Set default values if data is invalid
  const chartData = {
    labels: ['CO2', 'CH4', 'Other GHGs'],
    datasets: [
      {
        label: 'Total GHG Emissions',
        data: isValidData ? [data.CO2, data.CH4, data.other_GHGs] : [0, 0, 0],
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

  return <Pie data={chartData} options={options} aria-label="Total Greenhouse Gas Emissions" />;
};

// PropTypes for better prop validation
PieChart.propTypes = {
  data: PropTypes.shape({
    CO2: PropTypes.number.isRequired,
    CH4: PropTypes.number.isRequired,
    other_GHGs: PropTypes.number.isRequired,
  }).isRequired,
};

// Default props for fallback values
PieChart.defaultProps = {
  data: {
    CO2: 0,
    CH4: 0,
    other_GHGs: 0,
  },
};

export default PieChart;

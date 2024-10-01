// src/components/EmissionsSavingsChart.js
import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
  Title,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Legend,
  Tooltip,
  Title
);

const EmissionsSavingsChart = ({ emissions, savings }) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const data = {
    labels: months,
    datasets: [
      {
        type: 'bar',
        label: 'CO2 Emissions (kg)',
        data: emissions,
        backgroundColor: 'lightcoral',
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'CO2 Saved (kg)',
        data: savings,
        borderColor: 'seagreen',
        backgroundColor: 'seagreen',
        fill: false,
        yAxisID: 'y1',
        tension: 0.1,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Carbon Emissions and Savings over the Year',
        font: { size: 16, weight: 'bold' },
      },
      legend: {
        position: 'top',
        labels: { font: { size: 12 } },
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'CO2 Emissions (kg)',
          font: { size: 12 },
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        title: {
          display: true,
          text: 'CO2 Saved (kg)',
          font: { size: 12 },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default EmissionsSavingsChart;

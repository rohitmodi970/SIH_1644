// src/components/SafetyLevelChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SafetyLevelChart = ({ title, labels, levels, safeLevel, yLabel, barColor }) => {
  const data = {
    labels,
    datasets: [
      {
        label: yLabel,
        data: levels,
        backgroundColor: barColor,
      },
      {
        label: 'Safe Level',
        data: Array(levels.length).fill(safeLevel),
        type: 'line',
        borderColor: 'black',
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        font: { size: 16, weight: 'bold' },
      },
      legend: {
        display: true,
        position: 'top',
        labels: { font: { size: 12 } },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yLabel,
          font: { size: 12 },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SafetyLevelChart;

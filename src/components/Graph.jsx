// ghg-frontend/src/App.js
import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Automatically register Chart.js components

function Graph() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://sih-1644.onrender.com/api/data')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  // Prepare data for Line Chart
  const lineChartData = {
    labels: data.month,
    datasets: [
      {
        label: 'CO2 Emissions (kilo tonnes)',
        data: data.CO2,
        borderColor: 'royalblue',
        backgroundColor: 'rgba(65, 105, 225, 0.5)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'CH4 Emissions (kilo tonnes)',
        data: data.CH4.map((ch4) => ch4 * 12),
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 165, 0, 0.5)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Total GHGs (kilo tonnes)',
        data: data.TotalGHGs,
        borderColor: 'green',
        backgroundColor: 'rgba(34, 139, 34, 0.5)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Greenhouse Gas Emissions',
        font: { size: 20, weight: 'bold' },
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
          font: { size: 14 },
        },
      },
      y: {
        title: {
          display: true,
          text: 'Emissions (in kilotonne)',
          font: { size: 14 },
        },
      },
    },
  };

  // Prepare data for Pie Chart
  const pieChartData = {
    labels: ['CO2', 'CH4', 'Other GHGs'],
    datasets: [
      {
        data: [
          data.CO2.reduce((a, b) => a + b, 0),
          data.CH4.reduce((a, b) => a + b, 0),
          data.otherGHGs.reduce((a, b) => a + b, 0),
        ],
        backgroundColor: ['#4e79a7', '#f28e2b', '#e15759'],
        hoverOffset: 4,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Total Greenhouse Gas Emissions',
        font: { size: 20, weight: 'bold' },
      },
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Greenhouse Gas Emissions</h1>
          <p className="text-gray-600 mt-2">Visualizing CO₂ and CH₄ Emissions Data</p>
        </header>

        <section className="bg-white shadow-md rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Monthly Greenhouse Gas Emissions</h2>
          <Line data={lineChartData} options={lineChartOptions} />
        </section>

        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Greenhouse Gas Emissions</h2>
          <Pie data={pieChartData} options={pieChartOptions} />
        </section>

        <footer className="text-center mt-12 text-gray-500">
          &copy; {new Date().getFullYear()} Greenhouse Gas Monitoring
        </footer>
      </div>
    </div>
  );
}

export default Graph;

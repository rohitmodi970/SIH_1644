import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const EmissionsChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch data from the backend API
    axios.get('http://localhost:4000/api/data')
      .then(response => {
        setChartData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {chartData.datasets ? (
        <Line
          data={chartData}
          options={{
            title: {
              display: true,
              text: 'Monthly Greenhouse Gas Emissions',
              fontSize: 20,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default EmissionsChart;

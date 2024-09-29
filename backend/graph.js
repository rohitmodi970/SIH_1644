// ghg-backend/server.js
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Sample Data
const data = {
  month: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  CO2: [200, 220, 210, 250, 230, 240, 290, 280, 260, 270, 290, 214],
  CH4: [20, 22, 21, 25, 23, 24, 20, 20, 23, 28, 30, 24],
};

// Function to calculate Total GHGs and other_GHGs
function calculateGHGs(data) {
  const totalGHGs = data.CO2.map((co2, idx) => {
    const ch4 = data.CH4[idx];
    const randomFactor = Math.random() * (0.009 - 0.005) + 0.005;
    return co2 + ch4 * 12 + (co2 + ch4 * 12) * randomFactor;
  });

  const otherGHGs = totalGHGs.map((total, idx) => total - (data.CO2[idx] + data.CH4[idx] * 12));

  return { totalGHGs, otherGHGs };
}

const { totalGHGs, otherGHGs } = calculateGHGs(data);

// API Endpoint to get all data
app.get('/api/data', (req, res) => {
  res.json({
    month: data.month,
    CO2: data.CO2,
    CH4: data.CH4,
    TotalGHGs: totalGHGs,
    otherGHGs: otherGHGs,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

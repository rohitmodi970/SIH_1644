// src/data/ghgData.js

export const monthlyGHGData = {
    month: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    CO2: [200, 220, 210, 250, 230, 240, 290, 280, 260, 270, 290, 214],
    CH4: [20, 22, 21, 25, 23, 24, 20, 20, 23, 28, 30, 24],
  };
  
  export const totalGHGData = {
    CO2: 2864, // Sum of CO2 emissions
    CH4: 276,  // Sum of CH4 emissions multiplied by 12 (assuming CH4 is in percentage)
    other_GHGs:  // Calculate based on your logic
      monthlyGHGData.CO2.reduce((a, b) => a + b, 0) +
      monthlyGHGData.CH4.reduce((a, b) => a + b * 12, 0) *
        (0.005 + 0.009) / 2, // Averaging the random factor
  };
  
// Monthly GHG data
export const monthlyGHGData = {
  month: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  CO2: [200, 220, 210, 250, 230, 240, 290, 280, 260, 270, 290, 214],
  CH4: [20, 22, 21, 25, 23, 24, 20, 20, 23, 28, 30, 24],
};

// New data structure for DataFrame (pseudo-code)
// If using JavaScript, consider libraries like Danfo.js for DataFrame functionality
const data = {
  month: monthlyGHGData.month,
  CO2: monthlyGHGData.CO2,
  CH4: monthlyGHGData.CH4,
};

// Calculate total GHG data
const totalGHGData = {
  CO2: monthlyGHGData.CO2.reduce((sum, value) => sum + value, 0),
  CH4: monthlyGHGData.CH4.reduce((sum, value) => sum + value, 0) * 12,
  // Simplifying other_GHGs calculation, assuming it represents emissions not captured by CO2 and CH4
  other_GHGs: 0, // Replace with a calculation if necessary
};
const otherGHGValues = {
  CO2: 0, // Replace with your actual CO2 value
  CH4: 0, // Replace with your actual CH4 value
  other_GHGs: other_GHGs, // Your calculated value for other GHGs
};
// Example estimate for other_GHGs (10% of total GHG emissions)
const totalEmissions = totalGHGData.CO2 + totalGHGData.CH4;
totalGHGData.other_GHGs = totalEmissions * 0.10; // For example, 10% of total emissions

// Print or use the totalGHGData
console.log(totalGHGData);

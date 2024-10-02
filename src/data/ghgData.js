export const monthlyGHGData = {
  month: [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ],
  CO2: [200, 220, 210, 250, 230, 240, 290, 280, 260, 270, 290, 214],
  CH4: [20, 22, 21, 25, 23, 24, 20, 20, 23, 28, 30, 24],
  totalGHGs: [2300, 2450, 2400, 2700, 2600, 2750, 2950, 2850, 2800, 2900, 3100, 2600], // Example total GHG data (including other GHGs)
};

// Calculate total emissions for CO2 and CH4
const totalCO2 = monthlyGHGData.CO2.reduce((sum, value) => sum + value, 0);
const totalCH4 = monthlyGHGData.CH4.reduce((sum, value) => sum + value * 15, 0);  // CH4 * 15 is the Global Warming Potential (GWP)

const totalGHGs = monthlyGHGData.totalGHGs.reduce((sum, value) => sum + value, 0);

// Now calculate other GHGs as the difference between total GHGs and the sum of CO2 and CH4
export const totalGHGData = {
  CO2: 2954,  // Sum of CO2 emissions
  CH4: 4200,  // Sum of CH4 emissions with GWP factor of 12
  totalGHGs: 0,  // Will be calculated below
  other_GHGs: 0,  // Will be calculated below
};

// Generate a random value between 0.005 and 0.009
const randomFactor = Math.random() * (0.009 - 0.005) + 0.005;

// Calculate Total GHGs
totalGHGData.totalGHGs = totalGHGData.CO2 + totalGHGData.CH4 * 12 + (totalGHGData.CO2 + totalGHGData.CH4 * 12) * randomFactor;

// Calculate Other GHGs
totalGHGData.other_GHGs = totalGHGData.totalGHGs - (totalGHGData.CO2 + totalGHGData.CH4 * 12);

// Log the values for debugging
console.log('CO2:', totalGHGData.CO2);
console.log('CH4:', totalGHGData.CH4);
console.log('Total GHGs:', totalGHGData.totalGHGs);
console.log('Other GHGs:', totalGHGData.other_GHGs);

// Set a minimum threshold if the value of other_GHGs is too small
if (totalGHGData.other_GHGs < 1) {
  totalGHGData.other_GHGs = 1;  // Set a small value for visibility in the chart
}
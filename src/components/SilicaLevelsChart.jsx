// src/components/SilicaLevelsChart.js
import React from 'react';
import SafetyLevelChart from './SafetyLevelChart';

const SilicaLevelsChart = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const silicaLevels = [0.03, 0.04, 0.05, 0.06, 0.045, 0.055, 0.048, 0.038, 0.042, 0.052, 0.056, 0.049];
  const silicaSafe = 0.05; // %

  return (
    <SafetyLevelChart
      title="Silica Levels Over the Year"
      labels={months}
      levels={silicaLevels}
      safeLevel={silicaSafe}
      yLabel="Silica Levels (%)"
      barColor="teal"
    />
  );
};

export default SilicaLevelsChart;

// src/components/COLevelsChart.js
import React from 'react';
import SafetyLevelChart from './SafetyLevelChart';

const COLevelsChart = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const coLevels = [40, 60, 35, 80, 55, 45, 30, 70, 50, 65, 38, 42];
  const coSafe = 50; // ppm

  return (
    <SafetyLevelChart
      title="CO Levels Over the Year"
      labels={months}
      levels={coLevels}
      safeLevel={coSafe}
      yLabel="CO Levels (ppm)"
      barColor="steelblue"
    />
  );
};

export default COLevelsChart;

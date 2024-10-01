// src/components/CH4LevelsChart.js
import React from 'react';
import SafetyLevelChart from './SafetyLevelChart';

const CH4LevelsChart = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const ch4Levels = [8, 11, 10, 9, 12, 13, 10, 11, 9, 10, 13, 12];
  const ch4Safe = 10; // % LEL

  return (
    <SafetyLevelChart
      title="CH₄ Levels Over the Year"
      labels={months}
      levels={ch4Levels}
      safeLevel={ch4Safe}
      yLabel="CH₄ Levels (% LEL)"
      barColor="tomato"
    />
  );
};

export default CH4LevelsChart;

// src/components/RCMDLevelsChart.js
import React from 'react';
import SafetyLevelChart from './SafetyLevelChart';

const RCMDLevelsChart = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const rcmdLevels = [1.0, 1.4, 1.2, 1.6, 1.7, 1.3, 1.5, 1.1, 1.3, 1.4, 1.6, 1.2];
  const rcmdSafe = 1.5; // mg/m³

  return (
    <SafetyLevelChart
      title="RCMD Levels Over the Year"
      labels={months}
      levels={rcmdLevels}
      safeLevel={rcmdSafe}
      yLabel="RCMD Levels (mg/m³)"
      barColor="goldenrod"
    />
  );
};

export default RCMDLevelsChart;

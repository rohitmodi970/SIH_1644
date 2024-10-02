// src/Graph.js
import React from 'react';
import LineChart from './LineChart';
import PieChart from './PieChart';
import EmissionsSavingsChart from './EmissionsSavingsChart';
import CarbonCreditsChart from './CarbonCreditsChart';
import COLevelsChart from './COLevelsChart';
import CH4LevelsChart from './CH4LevelsChart';
import RCMDLevelsChart from './RCMDLevelsChart';
import SilicaLevelsChart from './SilicaLevelsChart';
import { monthlyGHGData, totalGHGData } from '../data/ghgData';

function Graph() {
  // Example data for Emissions and Savings
  const emissions = [500, 450, 480, 520, 600, 550, 580, 490, 470, 510, 530, 560].map(val => val * 1000);
  const savings = [120, 130, 110, 140, 150, 160, 170, 140, 130, 150, 140, 160].map(val => val * 1000);

  // Example data for Carbon Credits
  const carbonCredits = [50, 45, 48, 52, 60, 55, 58, 49, 47, 51, 53, 56];

  return (
    <div className="p-6 bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] min-h-screen">
      {/* Header Section */}
      <header className="mb-8 text-center transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-4xl font-extrabold text-green-700">
          Greenhouse Gas Emissions Dashboard
        </h1>
      </header>

      {/* Main Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">

        {/* Monthly Greenhouse Gas Emissions */}
        <div className="bg-white shadow-lg rounded-lg p-6  transform transition-transform duration-300 hover:scale-105 ">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Monthly Greenhouse Gas Emissions
          </h2>
          <LineChart
            height={400} // Set the desired height here (e.g., 500px)
            data={{
              ...monthlyGHGData,
              TotalGHGs: monthlyGHGData.CO2.map((co2, index) =>
                co2 + monthlyGHGData.CH4[index] * 12 + (co2 + monthlyGHGData.CH4[index] * 12) * 0.007 ,// Using average random factor
              
              ),
            }}
          />
        </div>

        {/* Total Greenhouse Gas Emissions */}
        <div className="bg-white shadow-lg rounded-lg p-6 transform  transition-transform duration-300 hover:scale-105">


          <PieChart data={totalGHGData} />
        </div>

        {/* Carbon Emissions and Savings */}
        <div className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Carbon Emissions and Savings
          </h2>
          <EmissionsSavingsChart emissions={emissions} savings={savings} />
        </div>



        {/* Carbon Credits Earned and Safety Level Charts */}
        {/* Carbon Credits Earned Section */}

        <div className="bg-white shadow-lg rounded-lg p-6 col-span-1 md:col-span-2 lg:col-span-3">


          {/* Safety Level Charts Section */}
          <div>
            <h2 className="text-2xl p- font-semibold mb-4 text-gray-800">
              Safety Level Charts
            </h2>
            <div className="flex w-[30vw] flex-row gap-6 transform transition-transform duration-300 hover:scale-105 ">

              <COLevelsChart />
              <CH4LevelsChart />
              <RCMDLevelsChart />
            </div>
          </div>

        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105">

          <SilicaLevelsChart />
        </div>
        <div className=" bg-white shadow-lg rounded-lg p-6 transform transition-transform duration-300 hover:scale-105">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Carbon Credits Earned
          </h2>
          <CarbonCreditsChart credits={carbonCredits} />
        </div>

      </div>
    </div>
  );
}

export default Graph;

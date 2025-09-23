// /src/components/VisualizerPanel.jsx
import React, { useState, useEffect } from 'react';
import SortingVisualizer from './SortingVisualizer';
import PerformanceChart from './PerformanceChart';

export default function VisualizerPanel({ activeAlgorithm, onAlgorithmChange }) {
  const [lastRunData, setLastRunData] = useState(null);

  // Debug: Log when VisualizerPanel renders and track window size for responsive testing
  useEffect(() => {
    console.log('VisualizerPanel rendered for algorithm:', activeAlgorithm, 'at width:', window.innerWidth);
  }, [activeAlgorithm]);

  const handleSortingComplete = (data) => {
    console.log('Sorting completed:', data);
    const chartData = {
      algorithm: data.algorithm,
      size: data.size,
      comparisons: data.comparisons
    };
    setLastRunData(chartData);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Main Content Area - Split between bars and chart */}
      <div className="flex-1 flex flex-col space-y-6 min-h-0">
        {/* Bars Container - NO CARD BACKGROUND, just the area */}
        <div className="flex-1">
          <SortingVisualizer 
            activeAlgorithm={activeAlgorithm}
            onAlgorithmChange={onAlgorithmChange}
            onSortingComplete={handleSortingComplete}
          />
        </div>

        {/* Chart Container - Card background with ID for scroll targeting */}
        <div id="chart-container" className="flex-1 bg-visualizer-bg-secondary rounded-xl shadow-lg p-6">
          <PerformanceChart 
            selectedAlgorithm={activeAlgorithm}
            lastRunData={lastRunData}
          />
        </div>
      </div>

      {/* Hero Section - Card background */}
      <div className="flex-shrink-0 bg-visualizer-bg-secondary rounded-xl shadow-lg p-6 border-l-4 border-yellow-400">
        <h1 className="text-xl font-bold text-white mb-3">
          Sorting out patterns from chaos
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">
          This chart evolves with every execution — each point reflects the real-time average of all previous runs across users
        </p>
      </div>
    </div>
  );
}

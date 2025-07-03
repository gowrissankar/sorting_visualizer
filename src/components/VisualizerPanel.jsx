// /src/components/VisualizerPanel.jsx
import React, { useState } from 'react';
import SortingVisualizer from './SortingVisualizer';
import PerformanceChart from './PerformanceChart';

export default function VisualizerPanel({ activeAlgorithm, onAlgorithmChange }) {
  const [lastRunData, setLastRunData] = useState(null);

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
    <div className="flex flex-col gap-8 h-full">
      

      <SortingVisualizer 
        activeAlgorithm={activeAlgorithm}
        onAlgorithmChange={onAlgorithmChange}
        onSortingComplete={handleSortingComplete}
      />
      <PerformanceChart 
        selectedAlgorithm={activeAlgorithm}
        lastRunData={lastRunData}
      />

    {/* Hero message */}
      <div className="bg-visualizer-bg-secondary rounded-lg p-3 border-l-2 border-gray-500">
        <p className="text-gray-300 text-sm font-medium mb-1">
          Sorting out patterns from chaos
        </p>
        <p className="text-visualizer-text-secondary text-xs">
          This chart evolves with every execution — each point reflects the real-time average of all your previous runs.
        </p>
      </div>

    </div>
  );
}

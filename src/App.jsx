// src/App.jsx
import React, { useState } from 'react';
import SortingVisualizer from './components/SortingVisualizer';
import PerformanceChart from './components/PerformanceChart';
import { PerformanceService } from './services/performanceService';

const algorithmMapping = {
  'Bubble Sort': 'bubble_sort',
  'Selection Sort': 'selection_sort',
  'Insertion Sort': 'insertion_sort',
  'Merge Sort': 'merge_sort',
  'Quick Sort': 'quick_sort'
};

const App = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble_sort');
  const [lastRunData, setLastRunData] = useState(null);

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleSortingComplete = async (runData) => {
    try {
      // Always use the canonical key for DB and chart
      const dbAlgorithmName = algorithmMapping[runData.algorithm] || runData.algorithm;

      await PerformanceService.savePerformanceData(
        dbAlgorithmName,
        runData.arraySize,
        runData.comparisons
      );

      setLastRunData({
        algorithm: dbAlgorithmName,
        size: runData.arraySize,
        comparisons: runData.comparisons,
        timestamp: new Date().toLocaleString()
      });

      console.log('✅ Performance data saved successfully');
    } catch (error) {
      console.error('❌ Failed to save performance data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-visualizer-bg-primary flex flex-col">
      {/* Header */}
      <header className="bg-visualizer-bg-secondary shadow border-b border-visualizer-bg-dark">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center">
          <h1 className="text-3xl font-bold text-visualizer-text-primary">
            Sorting Algorithm Visualizer
          </h1>
          <p className="text-visualizer-text-secondary mt-1">
            Interactive visualization & collaborative performance analytics
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-start px-2 py-8">
        <div className="w-full max-w-3xl">
          <PerformanceChart
            selectedAlgorithm={selectedAlgorithm}
            lastRunData={lastRunData}
          />
        </div>
        <div className="w-full max-w-3xl mt-8">
          <SortingVisualizer
            onAlgorithmChange={handleAlgorithmChange}
            onSortingComplete={handleSortingComplete}
          />
        </div>
      </main>
    </div>
  );
};

export default App;

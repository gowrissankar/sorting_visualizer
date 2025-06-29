import React from 'react';
import SortingVisualizer from './components/SortingVisualizer';

const App = () => {
  return (
    <div className="min-h-screen bg-visualizer-bg-primary">
      <header className="bg-visualizer-bg-secondary shadow-lg border-b border-visualizer-bg-dark">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-visualizer-text-primary">
            Sorting Algorithm Visualizer
          </h1>
          <p className="text-visualizer-text-secondary mt-2">
            Interactive visualization of sorting algorithms
          </p>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <SortingVisualizer />
      </main>
    </div>
  );
};

export default App;

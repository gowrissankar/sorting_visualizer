// src/App.jsx
import React, { useState, useRef, useEffect } from 'react';
import SortingVisualizer from './components/SortingVisualizer';
import ArrayBar from './components/ArrayBar';
import { BAR_STATES } from './constants';

const App = () => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);
  const [currentTest, setCurrentTest] = useState(0);
  
  // Different test arrays
  const testArrays = [
    { name: "Small (8 elements)", data: [5, 2, 8, 1, 9, 3, 7, 4] },
    { name: "Medium (20 elements)", data: [15, 3, 8, 12, 1, 19, 6, 14, 11, 4, 17, 2, 20, 9, 13, 7, 18, 5, 16, 10] },
    { name: "Large (50 elements)", data: Array.from({length: 50}, (_, i) => Math.floor(Math.random() * 50) + 1) },
    { name: "Very Large (80 elements)", data: Array.from({length: 80}, (_, i) => Math.floor(Math.random() * 80) + 1) }
  ];
  
  const currentArray = testArrays[currentTest].data;
  
  // Responsive container width tracking
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  
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
        {/* ArrayBar Test Section with Multiple Sizes */}
        <div className="mb-8 p-6 bg-visualizer-bg-secondary rounded-lg border border-visualizer-bg-dark">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
            <h2 className="text-xl font-semibold text-visualizer-text-primary">
              ArrayBar Test - {testArrays[currentTest].name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {testArrays.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTest(index)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    currentTest === index 
                      ? 'bg-visualizer-text-accent text-visualizer-bg-primary' 
                      : 'bg-visualizer-bg-dark text-visualizer-text-secondary hover:bg-visualizer-bg-primary'
                  }`}
                >
                  {testArrays[index].name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
          
          {/* Responsive Container */}
          <div 
            ref={containerRef}
            className="w-full min-w-0 p-4 pt-12 bg-visualizer-bg-dark rounded overflow-hidden"
          >
            <div className="flex items-end justify-center gap-1 min-w-0">
              {currentArray.map((value, index) => (
                <ArrayBar
                  key={`${currentTest}-${index}`}
                  value={value}
                  index={index}
                  arraySize={Math.max(...currentArray)}
                  containerWidth={containerWidth}
                  state={BAR_STATES.DEFAULT}
                  isSorting={false}
                  onClick={(idx) => console.log(`Clicked bar ${idx} with value ${currentArray[idx]}`)}
                />
              ))}
            </div>
          </div>
          
          <div className="text-visualizer-text-secondary text-xs mt-2 text-center space-y-1">
            <p>Array Size: {currentArray.length} • Max Value: {Math.max(...currentArray)} • Container Width: {containerWidth}px</p>
            <p>Hover over bars to see tooltips • Try resizing window to test responsiveness</p>
          </div>
        </div>

        {/* Your existing SortingVisualizer */}
        <SortingVisualizer />
      </main>
    </div>
  );
};

export default App;

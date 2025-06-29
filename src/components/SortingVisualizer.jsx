import React, { useState } from 'react';
import { generateArray } from '../utils/helpers';
import {
  ARRAY_CONFIG,
  ANIMATION_STATES,
  ARRAY_GENERATION_TYPES,
} from '../constants';

const SortingVisualizer = () => {
  // Create array state, initialized with a sequential array
  const [array, setArray] = useState(() =>
    generateArray(ARRAY_CONFIG.DEFAULT_SIZE, ARRAY_GENERATION_TYPES.SEQUENTIAL)
  );

  // State variable for current animation state
  const [animationState, _setAnimationState] = useState(ANIMATION_STATES.IDLE);

  // Temporary function to handle new array generation
  const handleGenerateNew = (type) => {
    const newArray = generateArray(array.length, type);
    setArray(newArray);
    console.log(`Generated new array of type: ${type}`);
  };

  // JSX return
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-visualizer-text-primary mb-4">
          Current Array Size: {array.length}
        </h2>
        <p className="text-visualizer-text-secondary mb-4">
          Status: {animationState}
        </p>

        {/* Buttons to generate arrays */}
        <div className="space-x-4">
          <button
            onClick={() => handleGenerateNew(ARRAY_GENERATION_TYPES.SEQUENTIAL)}
            className="px-4 py-2 bg-visualizer-bar-default text-visualizer-bg-primary rounded hover:bg-visualizer-bar-hover transition-colors duration-200 shadow"
          >
            Generate Sequential
          </button>

          <button
            onClick={() => handleGenerateNew(ARRAY_GENERATION_TYPES.RANDOM)}
            className="px-4 py-2 bg-visualizer-bar-sorted text-visualizer-bg-primary rounded hover:bg-visualizer-bar-comparing transition-colors duration-200 shadow"
          >
            Generate Random
          </button>
        </div>
      </div>

      {/* Display the array as text */}
      <div className="bg-visualizer-bg-secondary p-6 rounded-lg shadow-xl border border-visualizer-bg-dark">
        <p className="text-center text-visualizer-text-accent mb-2 font-medium">
          Current Array
        </p>
        <p className="text-center font-mono text-sm text-visualizer-text-secondary break-all">
          [{array.join(', ')}]
        </p>
      </div>

      {/* Visualization Container */}
      <div className="bg-visualizer-bg-secondary p-6 rounded-lg shadow-xl border border-visualizer-bg-dark">
        <p className="text-center text-visualizer-text-secondary mb-4">
          Array visualization bars will go here
        </p>
        <div className="h-96 bg-visualizer-bg-dark rounded-md flex items-end justify-center">
          <p className="text-visualizer-text-accent">
            🎨 Beautiful bars coming next!
          </p>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;

// src/components/SortingVisualizer.jsx

import React, { useState, useEffect } from 'react';
import ArrayContainer from './ArrayContainer';
import { generateArray } from '../utils/helpers';
import {
  ARRAY_CONFIG,
  ANIMATION_STATES,
  ARRAY_GENERATION_TYPES,
} from '../constants';

const SortingVisualizer = () => {

  //intialising 
  const [array, setArray] = useState([]); 
  const [arraySize, setArraySize] = useState(ARRAY_CONFIG.DEFAULT_SIZE);

  //selected generation type (seq or rand)
  const [generationType, setGenerationType] = useState(ARRAY_GENERATION_TYPES.SEQUENTIAL);

  //animation state
  const [animationState, setAnimationState] = useState(ANIMATION_STATES.IDLE);

  //helper methods from arraycontainer
  const [animationMethods, setAnimationMethods] = useState(null);

  //array creation on slider/type change 
  useEffect(() => {
    if (animationState === ANIMATION_STATES.IDLE) {
      const newArray = generateArray(arraySize, generationType);
      setArray(newArray);
    }
  }, [arraySize, generationType, animationState]);

  //handle slider change
  const handleSizeChange = (e) => {
    if (animationState === ANIMATION_STATES.IDLE) {
      setArraySize(parseInt(e.target.value));
    }
  };

  //handle type change (seq/random)
  const handleTypeChange = (type) => {
    if (animationState === ANIMATION_STATES.IDLE) {
      setGenerationType(type);
    }
  };

  //animation methods ready from arraycontainer 
  const handleAnimationMethodsReady = (methods) => {
    setAnimationMethods(methods);
  };

  //JSX return
  return (
    <div className="sorting-visualizer p-6 bg-visualizer-bg-secondary rounded-lg">

      {/* Controls Section */}
      <div className="controls mb-6">
        <div className="flex flex-wrap gap-6 items-center justify-center">

          {/* Array Size Slider */}
          <div className="flex items-center gap-3">
            <label className="text-visualizer-text-primary text-sm font-medium">
              Array Size: 
              <span className="text-visualizer-text-accent font-bold ml-1">
                {arraySize}
              </span>
            </label>
            <input
              type="range"
              min={ARRAY_CONFIG.MIN_SIZE}
              max={ARRAY_CONFIG.MAX_SIZE}
              value={arraySize}
              onChange={handleSizeChange}
              disabled={animationState !== ANIMATION_STATES.IDLE}
              className="w-32 h-2 bg-visualizer-bg-dark rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          {/* Generation Type Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-visualizer-text-primary text-sm">Type:</span>
            <div className="flex bg-visualizer-bg-dark rounded-lg p-1">
              <button
                onClick={() => handleTypeChange(ARRAY_GENERATION_TYPES.SEQUENTIAL)}
                disabled={animationState !== ANIMATION_STATES.IDLE}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  generationType === ARRAY_GENERATION_TYPES.SEQUENTIAL
                    ? 'bg-visualizer-text-accent text-visualizer-bg-primary font-medium'
                    : 'text-visualizer-text-secondary hover:text-visualizer-text-primary'
                }`}
              >
                Sequential
              </button>
              <button
                onClick={() => handleTypeChange(ARRAY_GENERATION_TYPES.RANDOM)}
                disabled={animationState !== ANIMATION_STATES.IDLE}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  generationType === ARRAY_GENERATION_TYPES.RANDOM
                    ? 'bg-visualizer-text-accent text-visualizer-bg-primary font-medium'
                    : 'text-visualizer-text-secondary hover:text-visualizer-text-primary'
                }`}
              >
                Random
              </button>
            </div>
          </div>

        </div>

        {/* Extra Info */}
        <div className="text-center mt-3">
          <p className="text-visualizer-text-secondary text-xs">
            {generationType === ARRAY_GENERATION_TYPES.SEQUENTIAL 
              ? "Sequential: Unique values 1-to-size, shuffled for clean visualization"
              : "Random: Values 1-to-size with possible duplicates"
            }
          </p>
        </div>
      </div>

      {/* Visualizer Bars */}
      <ArrayContainer
        array={array}
        animationState={animationState}
        onAnimationComplete={handleAnimationMethodsReady} //from child
      />
    </div>
  );
};

export default SortingVisualizer;

// /src/components/Controls.jsx

import React from 'react';

/**
 * Controls
 * - User controls for sorting visualization.
 * - Props:
 *   - isSorting: boolean (disable controls during sorting)
 *   - onPlayPause: function (toggle sorting)
 *   - onShuffle: function (shuffle array)
 *   - speed: number (current speed)
 *   - onSpeedChange: function (update speed)
 *   - arraySize: number (current array size)
 *   - onArraySizeChange: function (update array size)
 */
export default function Controls({
  isSorting,
  onPlayPause,
  onShuffle,
  speed,
  onSpeedChange,
  arraySize,
  onArraySizeChange,
}) {

  // Debug logs for user interactions - useful for interviews
  const handlePlayPause = () => {
    console.log('Play/Pause button clicked. Current state:', isSorting ? 'Playing' : 'Paused');
    onPlayPause();
  };

  const handleShuffle = () => {
    console.log('Shuffle button clicked');
    onShuffle();
  };

  const handleSpeedChange = (value) => {
    console.log('Speed slider changed to', value);
    onSpeedChange(value);
  };

  const handleArraySizeChange = (value) => {
    console.log('Array size slider changed to', value);
    onArraySizeChange(value);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center items-center bg-visualizer-bg-secondary p-4 rounded-lg shadow">
      <button
        onClick={handlePlayPause}
        disabled={isSorting}
        className={`px-4 py-2 rounded font-semibold transition 
          ${isSorting ? 'bg-visualizer-button-disabled text-visualizer-text-secondary cursor-not-allowed' : 'bg-visualizer-bg-dark text-visualizer-text-primary hover:bg-visualizer-bg-primary'}`}
      >
        {isSorting ? 'Pause' : 'Play'}
      </button>
      <button
        onClick={handleShuffle}
        disabled={isSorting}
        className={`px-4 py-2 rounded font-semibold transition 
          ${isSorting ? 'bg-visualizer-button-disabled text-visualizer-text-secondary cursor-not-allowed' : 'bg-visualizer-bg-dark text-visualizer-text-primary hover:bg-visualizer-bg-primary'}`}
      >
        Shuffle
      </button>
      <div className="flex items-center gap-2">
        <label className="text-visualizer-text-secondary text-sm">Speed</label>
        <input
          type="range"
          min={1}
          max={5}
          value={speed}
          onChange={e => handleSpeedChange(Number(e.target.value))}
          disabled={isSorting}
          className="w-24"
        />
        <span className="text-visualizer-text-accent font-mono">{speed}</span>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-visualizer-text-secondary text-sm">Array Size</label>
        <input
          type="range"
          min={10}
          max={100}
          step={1}
          value={arraySize}
          onChange={e => handleArraySizeChange(Number(e.target.value))}
          disabled={isSorting}
          className="w-24"
        />
        <span className="text-visualizer-text-accent font-mono">{arraySize}</span>
      </div>
    </div>
  );
}

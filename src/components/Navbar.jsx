// In Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ALGORITHMS } from '../constants/index.js';

const algorithmLabels = {
  [ALGORITHMS.BUBBLE_SORT]: 'Bubble Sort',
  [ALGORITHMS.SELECTION_SORT]: 'Selection Sort',
  [ALGORITHMS.INSERTION_SORT]: 'Insertion Sort',
  [ALGORITHMS.MERGE_SORT]: 'Merge Sort',
  [ALGORITHMS.QUICK_SORT]: 'Quick Sort'
};

// Fixed shuffles that are still readable
const LOGO_VARIATIONS = [
  'VizSort', 
  'SortziV',
  'ViztroS',
  'zortViS',
  'tSorViz',
  'VitSorz',
  'SorzVit'
];

// Get random shuffle from fixed list
const getRandomShuffle = () => {
  return LOGO_VARIATIONS[Math.floor(Math.random() * LOGO_VARIATIONS.length)];
};

export default function Navbar({ activeAlgorithm, onSelect, onToggleSidebar, sidebarOpen }) {
  const [logoText, setLogoText] = useState('SortViz');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    
    // Trigger animation and shuffle when algorithm changes
    setIsAnimating(true);
    
    setTimeout(() => {
      setLogoText(getRandomShuffle());
      setIsAnimating(false);
    }, 150);
    
  }, [activeAlgorithm]);

  // Reset logo to original on click
  const handleLogoClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setLogoText('SortViz');
      setIsAnimating(false);
    }, 150);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full bg-visualizer-bg-dark border-b border-visualizer-bg-secondary
                 flex items-center justify-between px-6 py-6 shadow-sm"
      style={{
        minHeight: '80px',
        backdropFilter: 'blur(6px)'
      }}
    >
      {/* Left side - Logo with click handler */}
      <div className="flex items-center">
        <div 
          onClick={handleLogoClick}
          className={`text-2xl font-bold text-visualizer-text-accent transition-all duration-300 cursor-pointer hover:scale-105 ${
            isAnimating ? 'scale-110 opacity-70' : 'scale-100 opacity-100'
          }`}
        >
          {logoText}
        </div>
      </div>

      {/* Rest of navbar stays the same */}
      <div className="flex gap-3 justify-center items-center">
        {Object.entries(algorithmLabels).map(([algorithmKey, algorithmLabel]) => (
          <button
            key={algorithmKey}
            onClick={() => onSelect(algorithmKey)}
            className={
              `px-5 py-2 rounded transition-all duration-150 leading-none
              ${activeAlgorithm === algorithmKey
                ? 'text-visualizer-text-accent text-xl font-bold scale-110'
                : 'text-visualizer-text-secondary text-lg font-medium hover:text-visualizer-text-primary'}`
            }
            style={{
              height: '44px',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-current={activeAlgorithm === algorithmKey ? "page" : undefined}
          >
            {algorithmLabel}
          </button>
        ))}
      </div>

      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="p-3 rounded-lg bg-visualizer-bg-secondary hover:bg-visualizer-border-muted transition text-gray-400 hover:text-gray-300"
          aria-label="Toggle Sidebar"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

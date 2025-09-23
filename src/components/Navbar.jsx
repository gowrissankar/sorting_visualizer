// /src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { ALGORITHMS } from '../constants/index.js';

const algorithmLabels = {
  [ALGORITHMS.BUBBLE_SORT]: 'Bubble Sort',
  [ALGORITHMS.SELECTION_SORT]: 'Selection Sort',
  [ALGORITHMS.INSERTION_SORT]: 'Insertion Sort',
  [ALGORITHMS.MERGE_SORT]: 'Merge Sort',
  [ALGORITHMS.QUICK_SORT]: 'Quick Sort',
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
    // Debug: Log algorithm changes with window width for responsive testing
    console.log("Navbar: Algorithm changed to", activeAlgorithm, "at width:", window.innerWidth);
    
    // Trigger animation and shuffle when algorithm changes
    setIsAnimating(true);
    
    const timer = setTimeout(() => {
      setLogoText(getRandomShuffle());
      setIsAnimating(false);
    }, 150);

    return () => clearTimeout(timer);
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
                 flex flex-col sm:flex-row items-center justify-between px-3 md:px-6 py-3 md:py-6 shadow-sm"
      style={{
        minHeight: '70px', // Smaller on mobile
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Left side - Logo with click handler - Hide on mobile */}
      <div className="hidden md:flex items-center mb-3 sm:mb-0">
        <div 
          onClick={handleLogoClick}
          className={`text-xl sm:text-2xl font-bold text-visualizer-text-accent transition-all duration-300 cursor-pointer hover:scale-105 select-none ${
            isAnimating ? 'scale-110 opacity-70' : 'scale-100 opacity-100'
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') handleLogoClick(); }}
          aria-label="SortViz Logo - Click to reset"
        >
          {logoText}
        </div>
      </div>

      {/* Algorithm buttons - Smaller on mobile */}
      <div className="flex flex-wrap justify-center gap-1 md:gap-3 mb-3 sm:mb-0">
        {Object.entries(algorithmLabels).map(([algorithmKey, algorithmLabel]) => (
          <button
            key={algorithmKey}
            onClick={() => onSelect(algorithmKey)}
            className={
              `px-2 md:px-5 py-1 md:py-2 rounded transition-all duration-150 leading-none whitespace-nowrap text-xs md:text-base
              ${activeAlgorithm === algorithmKey
                ? 'text-visualizer-text-accent font-bold scale-105 sm:scale-110 md:text-xl'
                : 'text-visualizer-text-secondary font-medium hover:text-visualizer-text-primary md:text-lg'}`
            }
            style={{
              height: '32px', // Smaller on mobile
              display: 'flex',
              alignItems: 'center'
            }}
            aria-current={activeAlgorithm === algorithmKey ? "page" : undefined}
          >
            {algorithmLabel}
          </button>
        ))}
      </div>

      {/* Sidebar toggle button - only show on desktop */}
      <div className="hidden md:flex items-center">
        <button
          onClick={onToggleSidebar}
          className="p-3 rounded-lg bg-visualizer-bg-secondary hover:bg-visualizer-border-muted transition text-gray-400 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-visualizer-text-accent"
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

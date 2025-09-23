// /src/components/Sidebar.jsx
import React, { useEffect } from 'react';
import { ALGORITHM_CONTENT, ALGORITHM_NAMES } from '../constants/algorithmInfo.js';

export default function Sidebar({ activeAlgorithm, isOpen, isMobile = false }) {
  const algorithmName = ALGORITHM_NAMES[activeAlgorithm] || 'Unknown Algorithm';
  const content = ALGORITHM_CONTENT[activeAlgorithm] || {};

  useEffect(() => {
    console.log('Sidebar rendered at width:', window.innerWidth, 'Sidebar Open:', isOpen);
  }, [activeAlgorithm, isOpen]);

  return (
    <div className="h-full bg-visualizer-bg-secondary rounded-xl shadow-lg p-4 sm:p-6 overflow-y-auto flex flex-col text-base sm:text-sm md:text-base">
      
      {/* Algorithm Title - Same color as subheadings */}
      <h2 className="font-semibold text-2xl sm:text-xl md:text-2xl text-gray-400 mb-4 truncate">
        {algorithmName}
      </h2>

      {/* Content Sections - No HR lines */}
      <div className="space-y-6">
        {/* Basic Idea */}
        <section>
          <h3 className="font-medium text-gray-400 mb-2 text-base sm:text-sm md:text-base">
            Basic Idea
          </h3>
          <p className="text-visualizer-text-secondary leading-relaxed">
            {content.basicIdea}
          </p>
        </section>

        {/* What to Watch For */}
        <section>
          <h3 className="font-medium text-gray-400 mb-2 text-base sm:text-sm md:text-base">
            Watch out for
          </h3>
          <div className="bg-[#2a2d35] p-3 rounded text-sm text-visualizer-text-secondary leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 text-lg"></span>
              <p>{content.animationGuide}</p>
            </div>
          </div>
        </section>

        {/* Time Complexity */}
        <section>
          <h3 className="font-medium text-gray-400 mb-2 text-base sm:text-sm md:text-base">
            <a
              href="https://en.wikipedia.org/wiki/Time_complexity"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-visualizer-text-primary transition"
            >
              Time Complexity
            </a>
          </h3>
          <p className="text-visualizer-text-primary">
            {content.timeComplexity}
          </p>
        </section>

        {/* Pseudocode - Larger font, normal wrapping */}
        <section>
          <h3 className="font-medium text-gray-400 mb-2 text-base sm:text-sm md:text-base">
            Pseudocode
          </h3>
          <div className="bg-[#2a2d35] p-3 rounded text-visualizer-text-secondary leading-relaxed">
            <pre className="font-mono text-sm leading-tight whitespace-pre-wrap">
              {content.pseudocode}
            </pre>
          </div>
        </section>

        {/* Best/Worst/Average - Fixed alignment */}
        <section>
          <h3 className="font-medium text-gray-400 mb-2 text-base sm:text-sm md:text-base">
            Best/Worst/Average
          </h3>
          {content.bestWorstAvg && (
            <div className="space-y-2">
              <div className="flex">
                <span className="text-visualizer-text-secondary font-medium w-20 flex-shrink-0">Best:</span>
                <span className="text-visualizer-text-secondary flex-1">{content.bestWorstAvg.best}</span>
              </div>
              <div className="flex">
                <span className="text-visualizer-text-secondary font-medium w-20 flex-shrink-0">Average:</span>
                <span className="text-visualizer-text-secondary flex-1">{content.bestWorstAvg.average}</span>
              </div>
              <div className="flex">
                <span className="text-visualizer-text-secondary font-medium w-20 flex-shrink-0">Worst:</span>
                <span className="text-visualizer-text-secondary flex-1">{content.bestWorstAvg.worst}</span>
              </div>
            </div>
          )}
        </section>

        {/* Chart Insights */}
        <section>
          <h3 className="font-medium text-gray-400 mb-2 text-base sm:text-sm md:text-base">
            Chart Insights
          </h3>
          <p className="text-visualizer-text-secondary leading-relaxed mb-3">
            {content.graphBehavior}
          </p>
          <div className="bg-[#2a2d35] p-3 rounded text-sm text-visualizer-text-secondary leading-relaxed">
            {content.graphInsights}
          </div>
        </section>

        {/* Learn More + GitHub Link */}
        <section>
          <div className="flex items-center justify-between">
            <a
              href={content.learnMore}
              target="_blank"
              rel="noopener noreferrer"
              className="text-visualizer-text-secondary hover:text-visualizer-text-primary transition text-base sm:text-sm md:text-base"
            >
              Learn More →
            </a>
            <a
              href="https://github.com/gowrissankar/sorting_visualizer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-visualizer-text-secondary hover:text-visualizer-text-primary transition"
              title="View Source Code"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

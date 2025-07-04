// /src/components/Sidebar.jsx
import React from 'react';
import { ALGORITHM_CONTENT, ALGORITHM_NAMES } from '../constants/algorithmInfo.js';

export default function Sidebar({ activeAlgorithm, isOpen }) {
  const algorithmName = ALGORITHM_NAMES[activeAlgorithm] || 'Unknown Algorithm';
  const content = ALGORITHM_CONTENT[activeAlgorithm] || {};

  return (
    <div className="h-full bg-visualizer-bg-secondary rounded-xl shadow-lg p-6 overflow-y-auto">
      {/* Algorithm Title */}
      <h2 className="text-xl font-semibold text-visualizer-text-primary mb-4">
        {algorithmName}
      </h2>
      
      <hr className="border-visualizer-border-muted border-2 mb-6" />
      
      {/* Content Sections */}
      <div className="space-y-6">
        {/* Basic Idea */}
        <section>
          <h3 className="text-base font-medium text-gray-400 mb-2">
            Basic Idea
          </h3>
          <p className="text-visualizer-text-secondary leading-relaxed text-base">
            {content.basicIdea}
          </p>
        </section>

        <hr className="border-visualizer-border-muted border-2" />

         {/* What to Watch For */}
        <section>
          <h3 className="text-base font-medium text-gray-400 mb-2">
            watch out for 
          </h3>
          <div className="bg-[#2a2d35] p-3 rounded text-sm text-visualizer-text-secondary leading-relaxed">
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 text-lg"></span>
              <p>{content.animationGuide}</p>
            </div>
          </div>
        </section>

        <hr className="border-visualizer-border-muted border-2" />

        {/* Time Complexity */}
        <section>
          <h3 className="text-base font-medium text-gray-400 mb-2">
            <a 
              href="https://en.wikipedia.org/wiki/Time_complexity" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-visualizer-text-primary transition"
            >
              Time Complexity
            </a>
          </h3>
          <p className="text-visualizer-text-primary text-base">
            {content.timeComplexity}
          </p>
        </section>

        <hr className="border-visualizer-border-muted border-2" />

       

        {/* Pseudocode */}
        <section>
          <h3 className="text-base font-medium text-gray-400 mb-2">
            Pseudocode
          </h3>
          <div className="bg-[#2a2d35] p-3 rounded text-visualizer-text-secondary leading-relaxed">
            <pre className="font-mono text-sm">
              {content.pseudocode}
            </pre>
          </div>
        </section>

        <hr className="border-visualizer-border-muted border-2" />

        {/* Best/Worst/Average */}
        <section>
          <h3 className="text-base font-medium text-gray-400 mb-2">
            Best/Worst/Average
          </h3>
          {content.bestWorstAvg && (
            <ul className="space-y-2 text-base">
              <li className="flex items-center">
                <span className="text-visualizer-text-secondary font-medium w-16">Best:</span>
                <span className="text-visualizer-text-secondary">{content.bestWorstAvg.best}</span>
              </li>
              <li className="flex items-center">
                <span className="text-visualizer-text-secondary font-medium w-16">Average:</span>
                <span className="text-visualizer-text-secondary">{content.bestWorstAvg.average}</span>
              </li>
              <li className="flex items-center">
                <span className="text-visualizer-text-secondary font-medium w-16">Worst:</span>
                <span className="text-visualizer-text-secondary">{content.bestWorstAvg.worst}</span>
              </li>
            </ul>
          )}
        </section>

        <hr className="border-visualizer-border-muted border-2" />

        {/* Graph Behavior */}
        <section>
          <h3 className="text-base font-medium text-gray-400 mb-2">
            Chart Insights
          </h3>
          <p className="text-visualizer-text-secondary text-base leading-relaxed mb-3">
            {content.graphBehavior}
          </p>
          
          <div className="bg-[#2a2d35] p-3 rounded text-sm text-visualizer-text-secondary leading-relaxed">
            {content.graphInsights}
          </div>
        </section>

        <hr className="border-visualizer-border-muted border-2" />

        {/* Learn More */}
 {/* Learn More + GitHub */}
<section>
  <div className="flex items-center justify-between">
    <a 
      href={content.learnMore} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-visualizer-text-secondary hover:text-visualizer-text-primary transition text-base"
    >
      Learn More →
    </a>
    
    <a 
      //href=  "https://github.com/gowrissankar/sorting_visualizer" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-visualizer-text-secondary hover:text-visualizer-text-primary transition"
      title="View Source Code"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    </a>
  </div>
</section>

      </div>
    </div>
  );
}

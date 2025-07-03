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
        <section>
          <a 
            href={content.learnMore} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-visualizer-text-secondary hover:text-visualizer-text-primary transition text-base"
          >
            Learn More →
          </a>
        </section>
      </div>
    </div>
  );
}

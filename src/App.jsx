// /src/App.jsx
import React, { useState } from 'react';
import { ALGORITHMS } from './constants/index.js';
import Navbar from './components/Navbar';
import VisualizerPanel from './components/VisualizerPanel';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Get random algorithm on app start
const getRandomAlgorithm = () => {
  const algorithms = Object.values(ALGORITHMS);
  return algorithms[Math.floor(Math.random() * algorithms.length)];
};

export default function App() {
  const [activeAlgorithm, setActiveAlgorithm] = useState(getRandomAlgorithm());
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-visualizer-bg-primary text-visualizer-text-primary flex flex-col">
      <Navbar 
        activeAlgorithm={activeAlgorithm} 
        onSelect={setActiveAlgorithm}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex flex-1 w-full overflow-hidden p-8 gap-8">
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'w-3/4' : 'w-full'
        }`}>
          <VisualizerPanel 
            activeAlgorithm={activeAlgorithm}
            onAlgorithmChange={setActiveAlgorithm}
          />
        </div>
        
        {/* Sidebar - Card aligned with main content */}
        {sidebarOpen && (
          <div className="w-1/4 transition-all duration-300">
            <Sidebar
              activeAlgorithm={activeAlgorithm}
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
        )}


      </div>

      {/* <Footer /> */}

    </div>

    
  );
}

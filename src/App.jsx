// /src/components/App.jsx
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

  // Debug: log window size and sidebar state for responsive testing
  console.log("App Rendered: window width =", window.innerWidth, "sidebarOpen:", sidebarOpen);

  return (
    <div className="min-h-screen bg-visualizer-bg-primary text-visualizer-text-primary flex flex-col">
      <Navbar 
        activeAlgorithm={activeAlgorithm} 
        onSelect={setActiveAlgorithm}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
      />

      {/* Mobile Layout: Single Column (No Sidebar) */}
      <div className="md:hidden flex flex-col p-4 sm:p-6 gap-6">
        {/* Main Content */}
        <VisualizerPanel 
          activeAlgorithm={activeAlgorithm}
          onAlgorithmChange={setActiveAlgorithm}
        />

        {/* Sidebar Content Below (No Toggle, Always Visible) */}
        <div className="w-full">
          <Sidebar
            activeAlgorithm={activeAlgorithm}
            isOpen={true}
            isMobile={true}
          />
        </div>
      </div>

      {/* Desktop Layout: Side-by-Side with Toggle */}
      <div className="hidden md:flex flex-1 w-full overflow-hidden p-8 gap-8">
        {/* Main Content - Expands when sidebar closed */}
        <div className={`min-w-0 transition-all duration-300 ${
          sidebarOpen ? "w-3/4" : "w-full"
        }`}>
          <VisualizerPanel 
            activeAlgorithm={activeAlgorithm}
            onAlgorithmChange={setActiveAlgorithm}
          />
        </div>

        {/* Sidebar - Completely Hidden When Closed */}
        {sidebarOpen && (
          <div className="w-1/4 min-w-0 transition-all duration-300">
            <Sidebar
              activeAlgorithm={activeAlgorithm}
              isOpen={sidebarOpen}
              isMobile={false}
            />
          </div>
        )}
      </div>

      {/* <Footer /> */}
    </div>
  );
}

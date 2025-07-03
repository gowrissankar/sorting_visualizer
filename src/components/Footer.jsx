// /src/components/Footer.jsx

import React from 'react';

/**
 * Footer
 * - Minimal, always at the bottom.
 * - Includes your name, GitHub link, and optional version/project info.
 */
export default function Footer() {
  return (
    <footer className="w-full bg-visualizer-bg-dark text-visualizer-text-secondary py-3 flex flex-col sm:flex-row items-center justify-between px-4 text-xs mt-auto">
      <span>
        © {new Date().getFullYear()} Gowrisankar • Collaborative Sorting Visualizer
      </span>
      <span className="mt-1 sm:mt-0">
        <a
          href="https://github.com/gowrissankar/sorting_visualizer"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-visualizer-text-accent transition"
        >
          GitHub
        </a>
        <span className="mx-2">|</span>
        <span>v1.0.0</span>
      </span>
    </footer>
  );
}

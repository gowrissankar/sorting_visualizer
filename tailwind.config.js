/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        visualizer: {
          // Backgrounds
          'bg-primary': '#2c2e34',     // Main background
          'bg-secondary': '#323741',   // Card/section backgrounds
          'bg-dark': '#1e2025',        // Darkest areas
          // Optional: Sidebar or divider
          'sidebar-bg': '#23252a',     // Sidebar background (optional)
          'border-muted': '#393d46',   // Subtle divider (optional)

          // Sorting bar states
          'bar-default': '#e2b714',    // Default yellow
          'bar-hover': '#F2CB54',      // Hover state
          'bar-comparing': '#ffd966',  // Comparing state
          'bar-swapping': '#ff6b6b',   // Swapping (red)
          'bar-sorted': '#4ecdc4',     // Sorted (teal)
          'bar-pivot': '#e91e63',      // Hot pink - very visible on dark background




          // Text
          'text-primary': '#d1d0c5',   // Cream white
          'text-secondary': '#646669', // Muted gray
          'text-accent': '#e2b714',    // Yellow accent (for highlights)

          // Button (optional)
          'button-disabled': '#44444a', // Disabled/secondary button
        }
      },
      animation: {
        'bounce-subtle': 'bounce 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}

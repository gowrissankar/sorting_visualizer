/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {


      colors:
      {
        visualizer:
        {
          //background darks 
          'bg-primary': '#2c2e34',     // Main background
          'bg-secondary': '#323741',   // Card backgrounds
          'bg-dark': '#1e2025',        // Darkest areas

          // Bar colors (Yellow spectrum)
          'bar-default': '#e2b714',    // Default yellow
          'bar-hover': '#F2CB54',      // Hover state
          'bar-comparing': '#ffd966',  // Comparing state
          'bar-swapping': '#ff6b6b',   // Swapping (red)
          'bar-sorted': '#4ecdc4',     // Sorted (teal)
          
          // Text colors
          'text-primary': '#d1d0c5',   // Cream white
          'text-secondary': '#646669', // Muted gray
          'text-accent': '#e2b714',    // Yellow accent
        }
      },


      //hover 
      animation:
      {
        'bounce-subtle' : 'bounce 0.3s ease-in-out' ,
      }

    },
  },
  plugins: [],
}

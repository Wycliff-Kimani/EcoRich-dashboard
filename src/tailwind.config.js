module.exports = {
  content: [
    "./src/**/*.html", // Scans all HTML files in src for Tailwind classes
    "./src/js/**/*.js", // If you have JS files with classes
  ],
  theme: {
    extend: {
      colors: {
        "ecorich-green": "#1B4F3A", // Main vibrant green from t-shirts
        "ecorich-dark-green": "#1B5E20", // Darker for backgrounds/dark mode
        "ecorich-light-green": "#E8F5E9", // Lighter for highlights/cards
      },
    },
    darkMode: "class", // Enables dark mode toggling
  },
  plugins: [], // Add plugins later if needed (e.g., for forms)
};

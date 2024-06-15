// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./my-sanity-blog/**/*.html",  // Add path to HTML files in your Sanity Studio setup
    "./my-sanity-blog/**/*.js",    // Add path to JavaScript files in your Sanity Studio setup
    "./my-sanity-blog/**/*.jsx",   // Add path to JSX files in your Sanity Studio setup
    // You can add more paths as necessary for other file types used in your Sanity Studio
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#FFD700',
      },
      fontFamily: {
        'sriracha': ['Sriracha', 'cursive'],
        'merriweather': ['Merriweather', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        marquee: "marquee 20s linear infinite",
        marquee2: "marquee2 20s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Additional plugins if needed
  ],
};

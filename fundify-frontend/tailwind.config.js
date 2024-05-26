/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/images/loginbg.svg')",
        'pattern-bg': "url('/images/patternimg.svg')",
        
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
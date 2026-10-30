/** @type {import('tailwindcss').Config} */
export default { 
    content: ['./index.html', './src/**/*.{js,jsx}'],
     theme: { 
        extend: { colors: { ink: '#252820', cream: '#f6f3ed', sage: '#a8ad91', clay: '#c58e75' }, 
        fontFamily: { sans: ['DM Sans','sans-serif'], serif: ['Playfair Display','serif'] } } }, 
        plugins: [] };

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#faf6ed',
          100: '#f5e9d0',
          200: '#ead0a0',
          300: '#dcb46b',
          400: '#cf9c47',
          500: '#c0882e',
          600: '#a36d25',
          700: '#82531c',
          800: '#5f3c18',
          900: '#3d2713',
        },
        cream: {
          50: '#fffefb',
          100: '#fdfbf4',
          200: '#faf5e8',
          300: '#f5edd6',
          400: '#ede0b8',
          500: '#e0cc90',
        },
        ink: {
          800: '#42403a',
          900: '#36332e',
          950: '#242220',
        },
        maroon: {
          300: '#f6aaa0',
          400: '#ef7563',
          500: '#e54b35',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
        script: ['Great Vibes', 'cursive'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #ead0a0, #c0882e 35%, #dcb46b 60%, #a36d25)',
        'royal-gradient': 'linear-gradient(165deg, #3f3c36, #242220 40%, #3f3c36, #36332e)',
        'radial-gold': 'radial-gradient(ellipse at center, rgba(192,136,46,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};

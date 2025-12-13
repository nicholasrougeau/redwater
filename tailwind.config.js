/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Warm/dark slate overrides
        slate: {
          50: '#fcfaf8',
          100: '#f5f0eb',
          200: '#e6dcd3',
          300: '#d1bea8',
          400: '#a3846b',
          500: '#85664d',
          600: '#6b4f3b',
          700: '#573e31',
          800: '#47332a',
          850: '#2d221e', // Custom warm dark
          900: '#1c1512', // Deep warm black
          950: '#0c0502', // Almost pure black with red/orange undertone
        },
        // Primary accent colors (Orange/Red)
        accent: {
          400: '#fb923c', // Orange-400
          500: '#f97316', // Orange-500
          600: '#ea580c', // Orange-600
          glow: '#ef4444', // Red-500 for glow effects
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }
    },
  },
  plugins: [],
}

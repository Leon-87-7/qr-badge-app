import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(288, 37%, 46%)',
          hover: 'hsl(288, 37%, 36%)',
        },
        secondary: {
          DEFAULT: 'hsl(145, 76%, 56%)',
        },
        accent: {
          DEFAULT: 'hsl(215, 88%, 70%)',
        },
        error: {
          DEFAULT: 'hsl(0, 72%, 51%)',
        },
        background: {
          DEFAULT: 'hsl(215, 28%, 17%)',
          btn: 'hsl(212, 12%, 22%)',
          body: '#2b2b29',
        },
        text: {
          DEFAULT: 'hsl(34, 78%, 91%)',
          dark: 'hsl(215, 28%, 17%)',
        },
      },
      backgroundImage: {
        'gradient-badge': 'linear-gradient(-125deg, hsl(145, 76%, 56%) 20%, hsl(215, 88%, 70%) 40%, hsl(288, 37%, 46%) 80%)',
        'gradient-header': 'linear-gradient(135deg, hsl(145, 76%, 56%) 0%, hsl(288, 37%, 46%) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;

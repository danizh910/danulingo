import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          green:  '#58CC02',
          'green-dark': '#46A302',
          blue:   '#1CB0F6',
          purple: '#CE82FF',
          red:    '#FF4B4B',
          orange: '#FF9600',
          yellow: '#FFC800',
          gold:   '#FFD900',
        },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-fast':  'pulse 1s infinite',
        'xp-pop':      'xpPop 0.6s ease-out forwards',
        'streak-glow': 'streakGlow 1.5s ease-in-out infinite',
        'card-flip':   'cardFlip 0.4s ease-in-out',
        'slide-up':    'slideUp 0.3s ease-out',
        'confetti':    'confetti 1s ease-out forwards',
      },
      keyframes: {
        xpPop: {
          '0%':   { transform: 'scale(0) translateY(0)', opacity: '0' },
          '50%':  { transform: 'scale(1.3) translateY(-20px)', opacity: '1' },
          '100%': { transform: 'scale(1) translateY(-40px)', opacity: '0' },
        },
        streakGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 4px #FF9600)' },
          '50%':      { filter: 'drop-shadow(0 0 12px #FF9600)' },
        },
        cardFlip: {
          '0%':   { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        slideUp: {
          '0%':   { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',    opacity: '1' },
        },
        confetti: {
          '0%':   { transform: 'scale(0) rotate(0deg)',   opacity: '1' },
          '100%': { transform: 'scale(2) rotate(720deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

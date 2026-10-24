/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#040711',
        card: '#0a0f1d',
        'card-border': 'rgba(56, 189, 248, 0.15)',
        primary: {
          DEFAULT: '#00f0ff',
          hover: '#38bdf8',
          glow: 'rgba(0, 240, 255, 0.35)',
        },
        secondary: {
          DEFAULT: '#3b82f6',
          hover: '#60a5fa',
          glow: 'rgba(59, 130, 246, 0.35)',
        },
        accent: {
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          emerald: '#10b981',
        },
        navy: {
          950: '#030712',
          900: '#060d1f',
          800: '#0b152e',
          700: '#111f42',
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 25px -5px rgba(0, 240, 255, 0.45)',
        'blue-glow': '0 0 25px -5px rgba(59, 130, 246, 0.45)',
        'purple-glow': '0 0 25px -5px rgba(139, 92, 246, 0.45)',
        'glass-glow': '0 8px 32px 0 rgba(0, 240, 255, 0.08)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

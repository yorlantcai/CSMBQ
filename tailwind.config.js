/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        clinic: {
          50:  '#EBF3FF',
          100: '#D3E5FF',
          200: '#AACCFF',
          300: '#6DA6F5',
          400: '#3B84E0',
          500: '#1B5EA6', // Primary brand blue
          600: '#154D8C',
          700: '#0D3B6E',
          800: '#082952',
          900: '#041A36',
          950: '#020D1E',
        },
        sky: {
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        },
        surface: '#F0F4F9',
        dark: '#0A1628',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '4.5xl': ['2.625rem', { lineHeight: '1.1' }],
        '5.5xl': ['3.5rem',   { lineHeight: '1.05' }],
        '6.5xl': ['4.25rem',  { lineHeight: '1.0' }],
        '7.5xl': ['5.25rem',  { lineHeight: '0.95' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'clinic':    '0 4px 24px -4px rgba(27, 94, 166, 0.18)',
        'clinic-lg': '0 20px 60px -12px rgba(27, 94, 166, 0.28)',
        'clinic-xl': '0 32px 80px -12px rgba(27, 94, 166, 0.38)',
        'glass':     '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)',
        'float':     '0 24px 80px rgba(27, 94, 166, 0.22)',
        'card':      '0 2px 16px rgba(10, 22, 40, 0.08)',
        'card-hover':'0 12px 40px rgba(10, 22, 40, 0.14)',
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-gradient':     'linear-gradient(135deg, #041A36 0%, #082952 40%, #0D3B6E 70%, #154D8C 100%)',
        'clinic-gradient':   'linear-gradient(135deg, #1B5EA6 0%, #0EA5E9 100%)',
        'card-gradient':     'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
      },
      animation: {
        'float':          'float 6s ease-in-out infinite',
        'float-slow':     'float 8s ease-in-out infinite',
        'float-fast':     'float 4s ease-in-out infinite',
        'pulse-slow':     'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'shimmer':        'shimmer 2.5s linear infinite',
        'slide-up':       'slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        'fade-in':        'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-16px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        'spring':       'cubic-bezier(0.22, 1, 0.36, 1)',
        'spring-out':   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':       'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}

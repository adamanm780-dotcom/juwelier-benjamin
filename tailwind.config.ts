import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          light:    '#F0D678',
          DEFAULT:  '#C9A84C',
          metallic: '#D4AF5B',
          dark:     '#8A6D14',
          muted:    '#9A7E3A',
        },
        ebony: {
          DEFAULT: '#080808',
          light:   '#0F0F0F',
          surface: '#161616',
          card:    '#1E1E1E',
          border:  '#2A2A2A',
        },
        cream: '#F2EDE4',
        parchment: '#E8E0D4',
        'muted-gold': '#8B7D5A',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        jost:      ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up':   'fadeUp 0.8s ease forwards',
        'fade-in':   'fadeIn 1s ease forwards',
        'shimmer':   'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(135deg, #C9A84C 0%, #F0D678 40%, #C9A84C 60%, #8A6D14 100%)',
        'gold-shimmer':   'linear-gradient(90deg, #C9A84C 0%, #F0D678 30%, #E8C97A 50%, #F0D678 70%, #C9A84C 100%)',
        'surface-glow':   'radial-gradient(ellipse at top, #1A1507 0%, #080808 60%)',
      },
      boxShadow: {
        'gold-sm':  '0 0 15px rgba(201, 168, 76, 0.15)',
        'gold-md':  '0 0 30px rgba(201, 168, 76, 0.2)',
        'gold-lg':  '0 0 60px rgba(201, 168, 76, 0.25)',
        'card':     '0 4px 40px rgba(0,0,0,0.6)',
      },
      letterSpacing: {
        'luxury': '0.25em',
        'wide-xl': '0.35em',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
    },
  },
  plugins: [],
}
export default config

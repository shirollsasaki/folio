import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/templates/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        bg2: 'var(--bg2)',
        bg3: 'var(--bg3)',
        cream: 'var(--cream)',
        'cream-dim': 'var(--cream-dim)',
        gold: 'var(--gold)',
        'gold-light': 'var(--gold-light)',
        'lumo-bg-base': 'var(--lumo-bg-base)',
        'lumo-text': 'var(--lumo-text)',
        'lumo-text-muted': 'var(--lumo-text-muted)',
        'lumo-accent': 'var(--lumo-accent)',
        'lumo-secondary': 'var(--lumo-secondary)',
        'lumo-golden': 'var(--lumo-golden)',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'Courier New', 'monospace'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'lumo-glow': '0 0 30px rgba(230, 126, 34, 0.4)',
      },
      transitionTimingFunction: {
        'lumo': 'var(--ease-lumo)',
      },
    },
  },
  plugins: [],
};

export default config;

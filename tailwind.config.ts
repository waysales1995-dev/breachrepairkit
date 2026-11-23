import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        trust: '#2563EB',
        canvas: '#F8FAFC',
        line: '#E2E8F0',
      },
      boxShadow: {
        card: '0 12px 36px rgba(15, 23, 42, .07), 0 2px 6px rgba(15, 23, 42, .03)',
      },
    },
  },
  plugins: [],
};

export default config;

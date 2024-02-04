import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d85af', // Medium Blue
        'primary-hover': '#042c46', // Dark Blue
        'primary-active': '#bc2f5d', // Deep Pinkish-Red
        'primary-foreground': '#f7fbfb', // Very Light Gray (almost white)
        destructive: '#bc2f5d', // Deep Pinkish-Red
        'destructive-foreground': '#f7fbfb', // Very Light Gray (almost white)
        input: '#ced4da', // (Unchanged)
        background: '#f27a7c', // Soft Red
        accent: '#0d85af', // Medium Blue
        'accent-foreground': '#f7fbfb', // Very Light Gray (almost white)
        secondary: '#042c46', // Dark Blue
        'secondary-foreground': '#f7fbfb', // Very Light Gray (almost white)
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;

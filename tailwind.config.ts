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
        primary: '#3b82f6',
        'primary-hover': '#60a5fa',
        'primary-active': '#2563eb',
        'primary-foreground': '#ffffff',
        destructive: '#dc3545',
        'destructive-foreground': '#ffffff',
        input: '#ced4da',
        background: '#f8f9fa',
        accent: '#17a2b8',
        'accent-foreground': '#ffffff',
        secondary: '#6c757d',
        'secondary-foreground': '#ffffff',
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

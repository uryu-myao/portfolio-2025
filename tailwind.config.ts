import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'en-sans': ['Inter', 'sans-serif'],
      'en-serif': ['Hepta Slab', 'serif'],
      'ja-sans': ['Noto Sans JP', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: { DEFAULT: colors.neutral[200] },
        secondary: { DEFAULT: colors.neutral[200] },
      },
    },
  },
  plugins: [],
};
export default config;

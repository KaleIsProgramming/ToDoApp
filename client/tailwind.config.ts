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
        'white': '#ffffff',
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
        'red': '#dc2626',
        'faddedblack': '#00000069',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        xxl: '32px',
        xxxl: '82px',
        xxxxl: '256px',
        128: '32rem',
        192: '48rem',
        256: '64rem',
        seventh: '14.285714285%',
        eight: '12.5%',
        ninth: '11.111111111%',
        tenth: '10%',
        eighttenth: '80%',
        ninetenth: '90%',
      },
      screens: {

        'xs': '350px',

        'sm': '640px',
  
        'md': '768px',
  
        'lg': '1024px',
  
        'xl': '1280px',
  
        '2xl': '1536px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config

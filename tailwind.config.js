/** @type {import('tailwindcss').Config} */
export default {
  purge: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  content: [],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        '2xl': '1536px',
        'custom1530': '1530px'
      },
      fontSize: {
        'small': ['12px', '18px'],
        'medium': ['16px', 'normal'],
        'title-medium': ['24px', {
          lineHeight: '28.8px',
          fontWeight: '600',
        }]
      },
      fontFamily: {
        'museosamsrounded': ['MuseoSamsRounded', 'sans-serif'],
      },
    },
  },
  plugins: [],
}


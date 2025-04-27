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
        // montserrat: ['var(--font-montserrat)'],
        // 'cafeteria-black': ['cafeteria-black'],
        'museo-sams-rounded-300': ['MuseoSamsRounded'],
        // 'museo-sams-rounded-500': ['MuseoSamsRounded500'],
        // 'museo-sams-rounded-700': ['MuseoSamsRounded700'],
        // 'museo-sams-rounded-900': ['MuseoSamsRounded900'],
      },
    },
  },
  plugins: [],
}


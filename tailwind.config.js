module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      colors: {
        primary: {
          DEFAULT: '#8eb339',
          900: '#426a15',
          800: '#658c26',
          700: '#799f2f',
          600: '#8eb339',
          500: '#9ec341',
          400: '#adcc5e',
          300: '#bcd57c',
          200: '#cfe1a2',
          100: '#e2edc6',
          50: '#f4f8e8'
        },
        complementary: {
          DEFAULT: '#5e39b3',
          900: '#311f93',
          800: '#452ba2',
          700: '#5131aa',
          600: '#5e39b3',
          500: '#673eb9',
          400: '#7e5ac4',
          300: '#9578cf',
          200: '#b39fdc',
          100: '#d1c5ea',
          50: '#ede7f6'
        }
      }
    },
  },
  variants: {
    extend: {
      textAlign: ['hover', 'focus'],
      backgroundColor: ['checked']
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
}

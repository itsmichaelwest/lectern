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
        }
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.600'),
              textDecoration: 'none',
              "&:hover": {
                color: theme('colors.primary.900'),
                textDecoration: 'none',
              },
            },
          },
        },
      }),
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

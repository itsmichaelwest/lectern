module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      keyframes: true,
    },
  },
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'header': ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'],
      },
      inset: {
        'nav-height': '4.45rem',
      },
      display: ['group-hover'],
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
